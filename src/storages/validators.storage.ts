import { TValidationSchemaClass, TValidateFunction } from '../types';

export class ValidatorsStorage {
  private static _storage: Map<TValidationSchemaClass, TValidateFunction> = new Map();

  public static addNew(schema: TValidationSchemaClass, validator: TValidateFunction): void {
    this._storage.set(schema, validator);
  }

  public static getAll(): Array<{
    schema: TValidationSchemaClass;
    validator: TValidateFunction;
  }> {
    return Array.from(this._storage.entries()).map(([schema, validator]) => ({
      schema,
      validator
    }));
  }

  public static getSingle(schema: TValidationSchemaClass): TValidateFunction | null {
    return this._storage.get(schema) || null;
  }
}
