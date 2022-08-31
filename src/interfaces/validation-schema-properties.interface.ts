import {
  AsyncCheckFunction,
  SyncCheckFunction,
  ValidationRuleObject,
  ValidationSchema
} from 'fastest-validator';

export type ValidationOptionsType = Partial<ValidationRuleObject>;

export type ValidatorType = SyncCheckFunction | AsyncCheckFunction;

export interface IValidationSchemaOptions extends ValidationSchema {}

export interface IValidationSchemaShape {
  validationSchemaOptions: IValidationSchemaOptions;
  properties: Record<string, ValidationOptionsType>;
}
