# Nest.js Fastest-Validator

Fastest-Validator module for Nest.JS based on the fastest-validator package.

## Installation

```bash
$ npm install @nest-up/nest-fastest-validator fastest-validator
```

## Usage

Only import the NestFastestValidatorModule in your app root module:

```typescript
@Module({
  imports: [
    NestFastestValidatorModule.forRoot({
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
    NestFastestValidatorModule.forRootAsync({
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
class FastestValidatorConfig implements INestFastestValidatorModuleOptionsFactory {
  public createFastestValidatorModuleOptions(): ValidatorConstructorOptions {
    return {
      useNewCustomCheckerFunction: true
    };
  }
}
```

```typescript
@Module({
  imports: [
    NestFastestValidatorModule.forRootAsync({
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
  @String({
    min: 3,
    max: 25,
    empty: false
  })
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
  "statusCode": 422,
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

Of coures you can configure `FastestValidatorPipe` options:

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
