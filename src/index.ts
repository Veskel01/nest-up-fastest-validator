export * from './decorators';
export * from './types';
export * from './injection-tokens';

import { decoratorFactory } from './helpers/decorator-factory.helper';
import { FastestValidatorPipe } from './fastest-validator.pipe';
import { NestFastestValidatorModule } from './nest-fastest-validator.module';

export { FastestValidatorPipe, NestFastestValidatorModule, decoratorFactory };
