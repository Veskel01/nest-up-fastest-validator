import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  Optional,
  PipeTransform
} from '@nestjs/common';
import { ValidationError } from 'fastest-validator';
import { ValidatorsStorage } from '../storages';
import { plainToClass, ClassTransformOptions } from 'class-transformer';

interface IFastestValidationPipeOptions {
  httpErrorStatusCode: HttpStatus | number;
  exceptionFactory: (errors: ValidationError[]) => unknown | Promise<unknown>;
  disableErrorMessages: boolean;
  transformToClass: boolean;
  transformOptions: ClassTransformOptions;
}

interface IErrorResponse {
  statusCode: number;
  messages?: Array<{ field: string; message: string }>;
}

@Injectable()
export class FastestValidatorPipe implements PipeTransform {
  private readonly httpErrorStatusCode: HttpStatus | number;
  private readonly _exceptionFactory: (errors: ValidationError[]) => unknown | Promise<unknown>;
  private readonly _disableErrorMessages: boolean;
  private readonly _transformToClass: boolean;
  private readonly _transformOptions: ClassTransformOptions;
  private readonly _defaultErrorMessage = 'Validation failed';

  constructor(@Optional() options: Partial<IFastestValidationPipeOptions> = {}) {
    this.httpErrorStatusCode = options.httpErrorStatusCode || HttpStatus.UNPROCESSABLE_ENTITY;
    this._exceptionFactory = options.exceptionFactory || this._createExceptionFactory();
    this._disableErrorMessages = options.disableErrorMessages || false;
    this._transformToClass = options.transformToClass || false;
    this._transformOptions = options.transformOptions || {};
  }

  public async transform(value: unknown, { metatype }: ArgumentMetadata): Promise<unknown> {
    if (!metatype) {
      return value;
    }

    const validateFn = ValidatorsStorage.getValidateFunction(metatype);
    if (!validateFn) {
      return value;
    }

    const validationErrors = await validateFn(value);

    if (validationErrors !== true && validationErrors.length > 0) {
      throw this._exceptionFactory(validationErrors);
    }

    if (this._transformToClass) {
      const entity = plainToClass(metatype, value, this._transformOptions);
      if (entity.constructor !== metatype) {
        entity.constructor = metatype;
      }
      return entity;
    }

    return value;
  }

  private _createExceptionFactory() {
    return (errors: ValidationError[]): HttpException => {
      return new HttpException(this._parseErrorResponse(errors), this.httpErrorStatusCode);
    };
  }

  private _parseErrorResponse(errors: ValidationError[]): IErrorResponse {
    const messages = errors.map(({ message = this._defaultErrorMessage, field }) => ({
      field,
      message
    }));
    return {
      statusCode: this.httpErrorStatusCode,
      ...(!this._disableErrorMessages
        ? {
            messages
          }
        : {})
    };
  }
}
