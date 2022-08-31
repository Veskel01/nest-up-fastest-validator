import { ValidationRuleObject } from 'fastest-validator';
import { ValidationOptionsType, ValidationSchemaClass } from '../types';
import { ValidationSchemasStorage } from '../storages';

export function decoratorFactory<T extends ValidationOptionsType>(defaults: ValidationOptionsType) {
  return function (options: Partial<T> = {}): PropertyDecorator {
    return (target, propertyKey): void => {
      ValidationSchemasStorage.registerSchemaProperty(
        target.constructor as ValidationSchemaClass,
        propertyKey.toString(),
        {
          ...defaults,
          ...options,
          type: !options.type && defaults.type ? defaults.type : options.type
        }
      );
    };
  };
}

export function multiDecoratorFactory() {
  return function (options: ValidationRuleObject[]): PropertyDecorator {
    return (target, propertyKey): void => {
      ValidationSchemasStorage.registerSchemaProperty(
        target.constructor as ValidationSchemaClass,
        propertyKey.toString(),
        options
      );
    };
  };
}

export function aliasDecoratorFactory() {
  return function (aliasName: string): PropertyDecorator {
    return (target, propertyKey): void => {
      const options: ValidationOptionsType = {
        type: aliasName
      };
      ValidationSchemasStorage.registerSchemaProperty(
        target.constructor as ValidationSchemaClass,
        propertyKey.toString(),
        options
      );
    };
  };
}
