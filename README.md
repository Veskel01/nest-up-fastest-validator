# Nest.js Fastest-Validator

Fastest-Validator module for Nest.JS based on the fastest-validator package.

## Version 2.0.0

Changes in version 2.0.0:

1. New decorator `@Shorthand()` - for shorthand validation e.g. `@Shorthand('string | min:6 | max:32')`
2. Now you can extend classes with `@ValidationSchema()` decorator - properies will be inherited
3. `Validator` class for manual validation in services, controllers etc. To use it, inject `Validator` class in your class constructor `@InjectValidator(ValidationSchema)` and use `validate()`, `validateSync()` or `validateReactive()` method.
4. You can inject root `FastestValidator` class in your class constructor. Just use `@InjectFastestValidator()` decorator
5. Now instead function `decoratorFactory` you can use `create` in `FactoryDecorator` class. It's the same, but you can use it in your own decorators.

## Installation

```bash
$ npm install @nest-up/nest-fastest-validator fastest-validator class-transformer
```

## Usage

Only import the NestFastestValidatorModule in your app root module:

```typescript
@Module({
  imports: [
    FastestValidatorModule.forRoot({
      useNewCustomCheckerFunction: true
    })
  ]
})
class AppModule {}
```

### Async Options

**1. UseFactory**

```typescript
@Module({
  imports: [
    FastestValidatorModule.forRootAsync({
      useFactory: () => ({
        useNewCustomCheckerFunction: true
      })
    })
  ]
})
class AppModule {}
```

**2. Use class**

```typescript
@Injectable()
class FastestValidatorConfig implements IFastestValidatorModuleOptionsFactory {
  public createFastestValidatorModuleOptions(): TFastestValidatorModuleOptions {
    return {
      useNewCustomCheckerFunction: true
    };
  }
}
```

```typescript
@Module({
  imports: [
    FastestValidatorModule.forRootAsync({
      useClass: FastestValidatorConfig
    })
  ]
})
class AppModule {}
```

## Create validation Schemas

After module configuration you can define your validation schemas:

**_NOTE:_** `ValidationSchema`,`String`,`Number` and `Time` are decorators taken from the `@nest-up/nest-fastest-validator` package

```typescript
@ValidationSchema()
class ProductDTO {
  @Shorthand('string | min:2 | max:10 ')
  public name: string;

  @Number({
    integer: false,
    positive: true
  })
  public price: number;

  @Time({
    nullable: false
  })
  public createdAt: Date;

  @Shorthand('string[]')
  public tags: string[];
}
```

Now just prepare your controller:

**_NOTE:_** The FastestValidatorPipe is imported from "@nest-up/nest-fastest-validator" package

```typescript
@Controller('/products')
@UsePipes(FastestValidatorPipe)
class ProductsController {
  @Post('/create')
  public createNewProduct(@Body() productDTO: ProductDTO) {
    /// ...
  }
}
```

Now if we send request with invalid body properties - the following error will be returned to us

```json
{
  "statusCode": 400,
  "error": "Validation failed",
  "messages": [
    {
      "field": "name",
      "message": "The 'name' field is required."
    },
    {
      "field": "price",
      "message": "The 'price' field is required."
    },
    {
      "field": "createdAt",
      "message": "The 'createdAt' field is required."
    }
  ]
}
```

We can also inject validator class to our controller and use it to validate our data:

```typescript
@Controller('/products')
class ProductsController {
  constructor(@InjectValidator(ProductDTO) private readonly validator: Validator) {}

  @Post('/create')
  public createNewProduct(@Body() productDTO: ProductDTO) {
    this.validator.validate(productDTO);
    /// ...
  }
}
```

Of course you can can configure `FastestValidatorPipe` options:

```typescript
@UsePipes(
  new FastestValidatorPipe({
    transformToClass: true,
    disableValidationErrorMessages: true,
    httpErrorStatusCode: 404
  })
)
```

You can also use `FastestValidatorPipe` globally

```typescript
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new FastestValidatorPipe({
      disableValidationErrorMessages: true
    })
  );
  await app.listen(3000);
}
bootstrap();
```

## Decorators

All decorators accept an object of options that apply to the type being used, for a full list of options please refer to the fastest-validator [documentation](https://www.npmjs.com/package/fastest-validator).

# License

Licensed under the MIT license.
