import { ConsoleLogger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ClientKafka } from '@nestjs/microservices';
import 'reflect-metadata';
import { EventHandlerModule } from './event-handlers/handlers.module';
import {
  kafkaListeners,
  microserviceConfig,
} from './services/event-publisher/kafka.providers';
import { LoggerFactory } from './services/logger/logger-factory';

async function bootstrap() {
  const app = await NestFactory.create(EventHandlerModule);
  const config = app.get(ConfigService);

  kafkaListeners(app.get(ClientKafka));
  app.connectMicroservice(microserviceConfig(config));

  app.useLogger(LoggerFactory(config, new ConsoleLogger()));

  app.enableShutdownHooks();

  app.startAllMicroservices();
}

bootstrap();
