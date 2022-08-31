import { Type } from '@nestjs/common';
import { IValidationSchemaOptions } from '../types';
import { ValidationSchemasStorage } from '../storages';

export function ValidationSchema(schemaOptions: IValidationSchemaOptions = {}): ClassDecorator {
  return (target) => {
    ValidationSchemasStorage.registerNewSchema(target as unknown as Type, schemaOptions);
  };
}
