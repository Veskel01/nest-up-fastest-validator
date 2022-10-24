export * from './types';
export * from './decorators';
export * from './factories';
export * from './injection-tokens';

import { FastestValidatorPipe } from './fastest-validator.pipe';
import { FastestValidatorModule } from './validator.module';
import { Validator } from './validator';

export { FastestValidatorPipe, FastestValidatorModule, Validator };
