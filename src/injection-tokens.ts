import { Type } from '@nestjs/common';

export const FASTEST_VALIDATOR_TOKEN = Symbol('__fastest_validator__');

export const getValidatorToken = (schema: Type): string => `__registered_schema__${schema.name}`;
