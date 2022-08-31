import { NestFastestValidatorModuleOptions } from './module-options.type';

export interface INestFastestValidatorModuleOptionsFactory {
  createFastestValidatorModuleOptions():
    | NestFastestValidatorModuleOptions
    | Promise<NestFastestValidatorModuleOptions>;
}
