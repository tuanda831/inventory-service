import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ApisModule } from './rest-apis/apis.module';
import { LoggerFactory } from './services/logger/logger-factory';
import { SwaggerFactory } from './rest-apis/swagger/swagger-factory';
import { ConsoleLogger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(ApisModule, {
    logger: LoggerFactory(new ConsoleLogger()),
  });

  app.enableShutdownHooks();

  SwaggerFactory(app);

  await app.listen(3000);
}

bootstrap();
