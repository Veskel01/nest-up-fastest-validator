import { INestFastestValidatorModuleOptions } from './module-options.interface';

export interface INestFastestValidatorModuleOptionsFactory {
  createFastestValidatorModuleOptions():
    | INestFastestValidatorModuleOptions
    | Promise<INestFastestValidatorModuleOptions>;
}
