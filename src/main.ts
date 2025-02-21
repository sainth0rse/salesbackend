// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useLogger(logger);

  // Настройка Swagger
  const config = new DocumentBuilder()
    .setTitle('SalesStep API')
    .setDescription('API documentation for SalesStep application')
    .setVersion('1.0')
    .addBearerAuth() // Добавляем поддержку Bearer токена для авторизации
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  logger.log('Application is running on: http://localhost:3000');
  logger.log('API documentation available on: http://localhost:3000/api');
}
bootstrap().catch((err) => {
  console.error('Application failed to start:', err);
  process.exit(1);
});
