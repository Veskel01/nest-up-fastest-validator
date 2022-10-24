import {
  AsyncCheckFunction,
  SyncCheckFunction,
  ValidationRuleObject,
  ValidationSchema
} from 'fastest-validator';

export type TValidateFunction = SyncCheckFunction | AsyncCheckFunction;

export interface IValidationSchemaOptions extends ValidationSchema {}

export type TValidationRules = Partial<ValidationRuleObject> | string;

export interface IValidationSchemaShape {
  schemaOptions: IValidationSchemaOptions;
  registeredPropertiesWithRules: Record<string, TValidationRules>;
}
