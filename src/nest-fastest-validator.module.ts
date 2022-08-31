import { DynamicModule, Module, Provider } from '@nestjs/common';
import { FASTEST_VALIDATOR_TOKEN, getValidatorToken } from './injection-tokens';
import {
  ASYNC_OPTIONS_TYPE,
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  OPTIONS_TYPE
} from './module.declaration';
import FastestValidator from 'fastest-validator';
import { ValidationSchemasStorage, ValidatorsStorage } from './storages';
import { ValidatorType } from './interfaces';

@Module({})
export class NestFastestValidatorModule extends ConfigurableModuleClass {
  public static forRoot(options: typeof OPTIONS_TYPE = {}): DynamicModule {
    const { providers, ...rest } = super.forRoot(options);
    const validatorProvider = this._createFastestValidatorProvider();
    const validatorsProviders = this._createValidatorsProvider();
    return {
      ...rest,
      providers: [...(providers || []), validatorProvider, ...validatorsProviders]
    };
  }

  public static forRootAsync(options: typeof ASYNC_OPTIONS_TYPE = {}): DynamicModule {
    const { providers, ...rest } = super.forRootAsync(options);
    const validatorProvider = this._createFastestValidatorProvider();
    const validatorsProviders = this._createValidatorsProvider();
    return {
      ...rest,
      providers: [...(providers || []), validatorProvider, ...validatorsProviders]
    };
  }

  private static _createValidatorsProvider(): Provider[] {
    const registeredSchemas = ValidationSchemasStorage.getAllSchemas();
    const validatorProviders = Object.values(registeredSchemas).map(
      ({ metatype, schemaShape }): Provider => ({
        provide: getValidatorToken(metatype),
        useFactory: (fastestValidator: FastestValidator): ValidatorType => {
          const validator = fastestValidator.compile({
            ...schemaShape.validationSchemaOptions,
            ...schemaShape.properties
          });
          ValidatorsStorage.addNewValidator(metatype, validator);
          return validator;
        },
        inject: [FASTEST_VALIDATOR_TOKEN]
      })
    );
    ValidationSchemasStorage.clear();
    return validatorProviders;
  }

  private static _createFastestValidatorProvider(): Provider {
    return {
      provide: FASTEST_VALIDATOR_TOKEN,
      useFactory: ({
        validatorOptions = {},
        aliases = []
      }: typeof OPTIONS_TYPE): FastestValidator => {
        const validator = new FastestValidator(validatorOptions);
        aliases.forEach((alias) => {
          validator.alias(alias.name, alias.validationRule);
        });
        return validator;
      },
      inject: [MODULE_OPTIONS_TOKEN]
    };
  }
}
