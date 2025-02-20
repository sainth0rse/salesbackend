import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useLogger(logger);
  await app.listen(3000);
  logger.log('Application is running on: http://localhost:3000');
}
bootstrap().catch((err) => {
  console.error('Application failed to start:', err);
  process.exit(1);
});
