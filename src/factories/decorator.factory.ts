import { ValidationRuleObject } from 'fastest-validator';
import { SchemaStorage } from '../storages';
import { TValidationRules, TValidationSchemaClass } from '../types';

interface IRequiredDecoratorProps {
  type: string;
}

export class DecoratorFactory {
  public static create<T extends TValidationRules>({ type }: IRequiredDecoratorProps) {
    return (options: Partial<T> = {}): PropertyDecorator => {
      return (target, propertyKey): void => {
        const validationRules = {
          ...options,
          type
        };
        SchemaStorage.addProperty(
          target.constructor as TValidationSchemaClass,
          propertyKey.toString(),
          validationRules
        );
      };
    };
  }

  public static createMultiTypeDecorator() {
    return function (options: ValidationRuleObject[]): PropertyDecorator {
      return (target, propertyKey): void => {
        SchemaStorage.addProperty(
          target.constructor as TValidationSchemaClass,
          propertyKey.toString(),
          options
        );
      };
    };
  }

  public static createAliasTypeDecorator() {
    return function (aliasName: string): PropertyDecorator {
      return (target, propertyKey): void => {
        const options: ValidationRuleObject = {
          type: aliasName
        };
        SchemaStorage.addProperty(
          target.constructor as TValidationSchemaClass,
          propertyKey.toString(),
          options
        );
      };
    };
  }

  public static createShorthandDecorator() {
    return function (rules: string): PropertyDecorator {
      return (target, propertyKey): void => {
        SchemaStorage.addProperty(
          target.constructor as TValidationSchemaClass,
          propertyKey.toString(),
          rules
        );
      };
    };
  }
}
