import { ValidationSchemaClass, ValidatorType } from '../types';

export class ValidatorsStorage {
  private static _storage: Map<ValidationSchemaClass, ValidatorType> = new Map();

  public static addNewValidator(schema: ValidationSchemaClass, validator: ValidatorType): void {
    this._storage.set(schema, validator);
  }

  public static getValidateFunction(schema: ValidationSchemaClass): ValidatorType | null {
    const validator = this._storage.get(schema);
    return validator || null;
  }
}
