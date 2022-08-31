import { ValidationRuleObject, ValidatorConstructorOptions } from 'fastest-validator';

export interface INestFastestValidatorModuleOptions {
  validatorOptions?: ValidatorConstructorOptions;
  aliases?: Array<{ name: string; validationRule: ValidationRuleObject }>;
}
