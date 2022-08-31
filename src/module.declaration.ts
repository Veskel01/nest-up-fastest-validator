import { ConfigurableModuleBuilder } from '@nestjs/common';
import { CLASS_METHOD_NAME, FACTORY_METHOD_NAME } from './constants';
import { INestFastestValidatorModuleOptions } from './interfaces';

export const { OPTIONS_TYPE, ASYNC_OPTIONS_TYPE, ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<INestFastestValidatorModuleOptions>()
    .setClassMethodName(CLASS_METHOD_NAME)
    .setFactoryMethodName(FACTORY_METHOD_NAME)
    .build();
