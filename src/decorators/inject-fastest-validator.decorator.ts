import { Inject } from '@nestjs/common';
import { FASTEST_VALIDATOR_TOKEN } from '../injection-tokens';

export const InjectFastestValidator = (): ReturnType<typeof Inject> =>
  Inject(FASTEST_VALIDATOR_TOKEN);
