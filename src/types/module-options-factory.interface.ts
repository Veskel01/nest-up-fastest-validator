import { TFastestValidatorModuleOptions } from './module-options.type';

export interface IFastestValidatorModuleOptionsFactory {
  createFastestValidatorModuleOptions():
    | TFastestValidatorModuleOptions
    | Promise<TFastestValidatorModuleOptions>;
}
