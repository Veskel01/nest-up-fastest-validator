import {
  RuleAny,
  RuleArray,
  RuleBoolean,
  RuleClass,
  RuleCurrency,
  RuleDate,
  RuleEmail,
  RuleEnum,
  RuleEqual,
  RuleFunction,
  RuleLuhn,
  RuleMac,
  RuleNumber,
  RuleObjectID,
  RuleString,
  RuleURL,
  RuleUUID,
  RuleObject,
  RuleTuple,
  RuleCustomInline,
  RuleForbidden,
  RuleRecord
} from 'fastest-validator';
import { aliasDecoratorFactory, decoratorFactory, multiDecoratorFactory } from '../helpers';

export const String = decoratorFactory<RuleString>({
  type: 'string',
  empty: false
});
export const Boolean = decoratorFactory<RuleBoolean>({ type: 'boolean' });
export const Number = decoratorFactory<RuleNumber>({ type: 'number' });
export const UUID = decoratorFactory<RuleUUID>({ type: 'uuid' });
export const ObjectID = decoratorFactory<RuleObjectID>({ type: 'objectID' });
export const Email = decoratorFactory<RuleEmail>({ type: 'email' });
export const Time = decoratorFactory<RuleDate>({ type: 'date' });
export const Enum = decoratorFactory<RuleEnum>({ type: 'enum', values: [] });
export const Array = decoratorFactory<RuleArray>({ type: 'array' });
export const Any = decoratorFactory<RuleAny>({ type: 'any' });
export const Equal = decoratorFactory<RuleEqual>({ type: 'equal' });
export const ClassInstance = decoratorFactory<RuleClass>({ type: 'class' });
export const Currency = decoratorFactory<RuleCurrency>({ type: 'currency' });
export const Func = decoratorFactory<RuleFunction>({ type: 'function' });
export const Luhn = decoratorFactory<RuleLuhn>({ type: 'luhn' });
export const Mac = decoratorFactory<RuleMac>({ type: 'mac' });
export const Url = decoratorFactory<RuleURL>({ type: 'url' });
export const Custom = decoratorFactory<RuleCustomInline>({ type: 'custom' });
export const Tuple = decoratorFactory<RuleTuple>({ type: 'tuple' });
export const Nested = decoratorFactory<RuleObject>({ type: 'object' });
export const Forbidden = decoratorFactory<RuleForbidden>({ type: 'forbidden' });
export const Record = decoratorFactory<RuleRecord>({ type: 'record' });
export const Multi = multiDecoratorFactory();
export const Alias = aliasDecoratorFactory();
