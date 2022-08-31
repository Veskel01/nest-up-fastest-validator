import { Inject, Type } from '@nestjs/common';
import { getValidatorToken } from '../injection-tokens';

export const InjectValidatorProps = (schema: Type): ReturnType<typeof Inject> =>
  Inject(getValidatorToken(schema));
