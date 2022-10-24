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
import { DecoratorFactory } from '../factories';

export const String = DecoratorFactory.create<RuleString>({ type: 'string' });
export const Boolean = DecoratorFactory.create<RuleBoolean>({ type: 'boolean' });
export const Number = DecoratorFactory.create<RuleNumber>({ type: 'number' });
export const UUID = DecoratorFactory.create<RuleUUID>({ type: 'uuid' });
export const ObjectID = DecoratorFactory.create<RuleObjectID>({ type: 'objectID' });
export const Email = DecoratorFactory.create<RuleEmail>({ type: 'email' });
export const Time = DecoratorFactory.create<RuleDate>({ type: 'date' });
export const Enum = DecoratorFactory.create<RuleEnum>({ type: 'enum' });
export const Array = DecoratorFactory.create<RuleArray>({ type: 'array' });
export const Any = DecoratorFactory.create<RuleAny>({ type: 'any' });
export const Equal = DecoratorFactory.create<RuleEqual>({ type: 'equal' });
export const Class = DecoratorFactory.create<RuleClass>({ type: 'class' });
export const Currency = DecoratorFactory.create<RuleCurrency>({ type: 'currency' });
export const Func = DecoratorFactory.create<RuleFunction>({ type: 'function' });
export const Luhn = DecoratorFactory.create<RuleLuhn>({ type: 'luhn' });
export const Mac = DecoratorFactory.create<RuleMac>({ type: 'mac' });
export const Url = DecoratorFactory.create<RuleURL>({ type: 'url' });
export const Custom = DecoratorFactory.create<RuleCustomInline>({ type: 'custom' });
export const Tuple = DecoratorFactory.create<RuleTuple>({ type: 'tuple' });
export const Nested = DecoratorFactory.create<RuleObject>({ type: 'object' });
export const Forbidden = DecoratorFactory.create<RuleForbidden>({ type: 'forbidden' });
export const Record = DecoratorFactory.create<RuleRecord>({ type: 'record' });
export const Multi = DecoratorFactory.createMultiTypeDecorator();
export const Alias = DecoratorFactory.createAliasTypeDecorator();
export const Shorthand = DecoratorFactory.createShorthandDecorator();
