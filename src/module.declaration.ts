import { ConfigurableModuleBuilder } from '@nestjs/common';
import { TFastestValidatorModuleOptions } from './types';

export const { OPTIONS_TYPE, ASYNC_OPTIONS_TYPE, ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<TFastestValidatorModuleOptions>()
    .setClassMethodName('forRoot')
    .setFactoryMethodName('createFastestValidatorModuleOptions')
    .build();
