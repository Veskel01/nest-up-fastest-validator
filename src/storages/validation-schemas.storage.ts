import {
  IRegisteredSchemaOptions,
  IValidationSchemaOptions,
  ValidationOptionsType
} from '../types';
import { Type } from '@nestjs/common';

export class ValidationSchemasStorage {
  private static readonly _schemas: Map<string, IRegisteredSchemaOptions> = new Map();

  private constructor() {}

  public static registerNewSchema(
    schema: Type,
    schemaDecoratorOptions: IValidationSchemaOptions,
    initialProperties: IRegisteredSchemaOptions['schemaShape']['properties'] = {}
  ): void {
    const schemaData = this._schemas.get(schema.name);
    if (!schemaData) {
      this._schemas.set(schema.name, {
        metatype: schema,
        schemaShape: {
          properties: initialProperties,
          validationSchemaOptions: schemaDecoratorOptions
        }
      });
    } else {
      this._schemas.set(schema.name, {
        ...schemaData,
        metatype: schema,
        schemaShape: {
          properties: {
            ...schemaData.schemaShape.properties,
            ...initialProperties
          },
          validationSchemaOptions: {
            ...schemaData.schemaShape.validationSchemaOptions,
            ...schemaDecoratorOptions
          }
        }
      });
    }
  }

  public static registerSchemaProperty(
    schema: Type,
    propertyName: string,
    validationOptions: ValidationOptionsType
  ): void {
    if (typeof validationOptions !== 'object') {
      throw new Error(`Validation options must be an object`);
    }
    const registeredSchema = this._schemas.get(schema.name);
    if (registeredSchema) {
      registeredSchema.schemaShape.properties[propertyName] = validationOptions;
    } else {
      this.registerNewSchema(schema, {}, { [propertyName]: validationOptions });
    }
  }

  public static getSingleSchemaProperties(schema: Type): IRegisteredSchemaOptions {
    const schemaName = schema.name;
    const registeredSchema = this._schemas.get(schemaName);
    if (!registeredSchema) {
      throw new Error(`Schema ${schemaName} not found`);
    }
    return registeredSchema;
  }

  public static getAllSchemas(): Record<string, IRegisteredSchemaOptions> {
    return Object.fromEntries(this._schemas);
  }

  public static clear(): void {
    this._schemas.clear();
  }
}
