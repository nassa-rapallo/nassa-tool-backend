import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

const getSwaggerOptions = (): Omit<OpenAPIObject, 'paths'> => {
  return new DocumentBuilder()
    .setTitle('API docs')
    .addTag('app')
    .addTag('users')
    .addTag('auth')
    .addTag('permission')
    .setVersion('alpha')
    .build();
};

async function bootstrap() {
  //app configuration
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  //swagger configuration
  const options = getSwaggerOptions();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  //listen function
  await app.listen(7000);
}
bootstrap();
