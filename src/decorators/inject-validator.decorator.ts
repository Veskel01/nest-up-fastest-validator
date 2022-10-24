import { Inject } from '@nestjs/common';
import { getValidatorToken } from '../injection-tokens';
import { TValidationSchemaClass } from '../types';

export const InjectValidator = (schema: TValidationSchemaClass): ReturnType<typeof Inject> =>
  Inject(getValidatorToken(schema));
