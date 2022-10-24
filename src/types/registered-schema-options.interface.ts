import { Type } from '@nestjs/common';
import { IValidationSchemaShape } from './validation-schema-properties.interface';

export interface IRegisteredSchemaOptions {
  schema: Type;
  shape: IValidationSchemaShape;
}
