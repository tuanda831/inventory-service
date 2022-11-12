import { ConsoleLogger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ClientKafka } from '@nestjs/microservices';
import 'reflect-metadata';
import { ApisModule } from './rest-apis/apis.module';
import { SwaggerFactory } from './rest-apis/swagger/swagger-factory';
import { LoggerFactory } from './services/logger/logger-factory';

async function bootstrap() {
  const app = await NestFactory.create(ApisModule);

  const config = app.get(ConfigService);

  app.useLogger(LoggerFactory(config, new ConsoleLogger()));

  SwaggerFactory(app, config);

  const eventClient = app.get(ClientKafka);
  await eventClient.connect();

  app.enableShutdownHooks();
  await app.listen(3000);
}

bootstrap();
