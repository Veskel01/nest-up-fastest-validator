import { SCHEMA_WATERMARK } from '../constants';
import {
  IRegisteredSchemaOptions,
  IValidationSchemaOptions,
  IValidationSchemaShape,
  TValidationRules,
  TValidationSchemaClass
} from '../types';

export class SchemaStorage {
  private static _storage: Map<TValidationSchemaClass, IRegisteredSchemaOptions> = new Map();

  public static addNew(
    target: TValidationSchemaClass,
    options: IValidationSchemaOptions = {},
    initialProperties: IValidationSchemaShape['registeredPropertiesWithRules'] = {}
  ): void {
    const registeredSchema = this._storage.get(target);

    if (!registeredSchema) {
      this._storage.set(target, {
        schema: target,
        shape: {
          registeredPropertiesWithRules: initialProperties,
          schemaOptions: options
        }
      });
    } else {
      this._storage.set(target, {
        ...registeredSchema,
        shape: {
          registeredPropertiesWithRules: {
            ...(registeredSchema ? registeredSchema.shape.registeredPropertiesWithRules : {}),
            ...initialProperties
          },
          schemaOptions: {
            ...(registeredSchema ? registeredSchema.shape.schemaOptions : {}),
            ...options
          }
        }
      });
    }
    this._addExtendedClassProperties(target);
  }

  public static addProperty(
    target: TValidationSchemaClass,
    propertyKey: string,
    rules: TValidationRules | string = {}
  ): void {
    const registeredSchema = this._storage.get(target);
    if (!registeredSchema) {
      this.addNew(
        target,
        {},
        {
          [propertyKey]: rules
        }
      );
    }
    this._addExtendedClassProperties(target);
  }

  public static getAll(): Array<IRegisteredSchemaOptions> {
    return [...this._storage.values()].filter((value) => this._isWatermarked(value.schema));
  }

  public static clear(): void {
    this._storage.clear();
  }

  private static _updateSchemaProperties(
    target: TValidationSchemaClass,
    dataToUpdate: IValidationSchemaShape['registeredPropertiesWithRules']
  ): void {
    const registeredSchema = this._storage.get(target);
    if (registeredSchema) {
      this._storage.set(target, {
        ...registeredSchema,
        shape: {
          ...registeredSchema.shape,
          registeredPropertiesWithRules: {
            ...registeredSchema.shape.registeredPropertiesWithRules,
            ...dataToUpdate
          }
        }
      });
    }
  }

  private static _addExtendedClassProperties(target: TValidationSchemaClass): void {
    const prototype = Object.getPrototypeOf(target);
    if (prototype instanceof Function) {
      const prototypeRegisteredSchema = this._storage.get(prototype);
      if (prototypeRegisteredSchema) {
        this._updateSchemaProperties(
          target,
          prototypeRegisteredSchema.shape.registeredPropertiesWithRules
        );
      }
    }
  }

  private static _isWatermarked(target: TValidationSchemaClass): boolean {
    return Reflect.getMetadata(SCHEMA_WATERMARK, target) === true;
  }
}
