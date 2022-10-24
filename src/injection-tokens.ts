import { TValidationSchemaClass } from './types';

export const FASTEST_VALIDATOR_TOKEN = Symbol('__fastest_validator__');

export const getValidatorToken = (schema: TValidationSchemaClass): string =>
  `${schema.name}__validator__`;
