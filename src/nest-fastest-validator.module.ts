import { DynamicModule, Module, Provider } from '@nestjs/common';
import {
  ASYNC_OPTIONS_TYPE,
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  OPTIONS_TYPE
} from './module.declaration';
import FastestValidator from 'fastest-validator';
import { ValidationSchemasStorage, ValidatorsStorage } from './storages';
import { FASTEST_VALIDATOR_TOKEN } from './injection-tokens';

@Module({})
export class NestFastestValidatorModule extends ConfigurableModuleClass {
  public static forRoot(options: typeof OPTIONS_TYPE = {}): DynamicModule {
    const { providers, ...rest } = super.forRoot(options);
    const validatorProvider = this._createFastestValidatorProvider();
    return {
      ...rest,
      providers: [...(providers || []), validatorProvider],
      global: true
    };
  }

  public static forRootAsync(options: typeof ASYNC_OPTIONS_TYPE = {}): DynamicModule {
    const { providers, ...rest } = super.forRootAsync(options);
    const validatorProvider = this._createFastestValidatorProvider();
    return {
      ...rest,
      providers: [...(providers || []), validatorProvider],
      global: true
    };
  }

  private static _createFastestValidatorProvider(): Provider {
    return {
      provide: FASTEST_VALIDATOR_TOKEN,
      useFactory: (validatorOptions: typeof OPTIONS_TYPE = {}): FastestValidator => {
        const validator = new FastestValidator(validatorOptions);
        this._loadValidators(validator);
        Object.entries(validatorOptions.aliases || {}).forEach(([alias, aliasValidationRules]) => {
          validator.alias(alias, aliasValidationRules);
        });
        return validator;
      },
      inject: [MODULE_OPTIONS_TOKEN]
    };
  }

  private static _loadValidators(fastestValidator: FastestValidator): void {
    const registeredSchemas = ValidationSchemasStorage.getAllSchemas();
    Object.values(registeredSchemas).forEach(({ metatype, schemaShape }): void => {
      const validator = fastestValidator.compile({
        ...schemaShape.validationSchemaOptions,
        ...schemaShape.properties
      });
      ValidatorsStorage.addNewValidator(metatype, validator);
    });
    ValidationSchemasStorage.clear();
  }
}
