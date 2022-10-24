import { IValidationSchemaOptions, TValidationSchemaClass } from '../types';
import { SchemaStorage } from '../storages';
import { SCHEMA_WATERMARK } from '../constants';

export function ValidationSchema(schemaOptions: IValidationSchemaOptions = {}): ClassDecorator {
  return (target) => {
    SchemaStorage.addNew(target as unknown as TValidationSchemaClass, schemaOptions);
    Reflect.defineMetadata(SCHEMA_WATERMARK, true, target);
  };
}
