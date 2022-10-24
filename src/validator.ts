import { CheckFunctionOptions, ValidationError } from 'fastest-validator';
import { from, Observable } from 'rxjs';
import { TValidateFunction } from './types';

export class Validator {
  constructor(private readonly validateFn: TValidateFunction) {}

  public async validate<T = unknown>(
    data: T,
    options: CheckFunctionOptions = {}
  ): Promise<true | ValidationError[]> {
    const result = await this.validateFn(data, options);
    return result;
  }

  public validateSync<T = unknown>(
    data: T,
    options: CheckFunctionOptions = {}
  ): true | ValidationError[] {
    return this.validateFn(data, options) as true | ValidationError[];
  }

  public validateReactive<T = unknown>(
    data: T,
    options: CheckFunctionOptions = {}
  ): Observable<true | ValidationError[]> {
    return from(this.validate(data, options));
  }
}
