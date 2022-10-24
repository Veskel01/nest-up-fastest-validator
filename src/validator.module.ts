import { DynamicModule, Module, Provider } from '@nestjs/common';
import { ASYNC_OPTIONS_TYPE, ConfigurableModuleClass, OPTIONS_TYPE } from './module.declaration';
import FastestValidator from 'fastest-validator';
import { SchemaStorage, ValidatorsStorage } from './storages';
import { FASTEST_VALIDATOR_TOKEN, getValidatorToken } from './injection-tokens';
import { Validator } from './validator';

interface ICreatedProviders {
  fastestValidatorProvider: Provider;
  validatorsProviders: Provider[];
}

@Module({})
export class FastestValidatorModule extends ConfigurableModuleClass {
  public static forRoot(options: typeof OPTIONS_TYPE = {}): DynamicModule {
    const { providers, ...rest } = super.forRoot(options);

    const { fastestValidatorProvider, validatorsProviders } = this._createProviders(options);

    return {
      ...rest,
      providers: [...(providers || []), fastestValidatorProvider, ...validatorsProviders],
      exports: [fastestValidatorProvider, ...validatorsProviders],
      global: true
    };
  }

  public static forRootAsync(options: typeof ASYNC_OPTIONS_TYPE = {}): DynamicModule {
    const { providers, ...rest } = super.forRootAsync(options);

    const { fastestValidatorProvider, validatorsProviders } = this._createProviders(options);

    return {
      ...rest,
      providers: [...(providers || []), fastestValidatorProvider, ...validatorsProviders],
      exports: [fastestValidatorProvider, ...validatorsProviders],
      global: true
    };
  }

  private static _createProviders(validatorOptions: typeof OPTIONS_TYPE = {}): ICreatedProviders {
    const fastestValidator = new FastestValidator(validatorOptions);

    const schemas = SchemaStorage.getAll();

    schemas.forEach(({ schema, shape }) => {
      const validateFn = fastestValidator.compile({
        ...shape.schemaOptions,
        ...shape.registeredPropertiesWithRules
      });
      ValidatorsStorage.addNew(schema, validateFn);
    });
    Object.entries(validatorOptions.aliases || {}).forEach(([alias, aliasValidationRules]) => {
      fastestValidator.alias(alias, aliasValidationRules);
    });

    SchemaStorage.clear();

    const providers = {
      fastestValidatorProvider: {
        provide: FASTEST_VALIDATOR_TOKEN,
        useValue: fastestValidator
      },
      validatorsProviders: ValidatorsStorage.getAll().map(({ schema, validator: validateFn }) => ({
        provide: getValidatorToken(schema),
        useFactory: () => new Validator(validateFn)
      }))
    };
    return providers;
  }
}
