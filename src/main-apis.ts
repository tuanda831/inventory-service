import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ApisModule } from './rest-apis/apis.module';
import { shutdownHandler } from './utils/shutdown-handler';
import { LoggerProvider } from './dal/logger/logger.providers';
import { Swagger } from './rest-apis/swagger.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  let nestOption = {};
  if (process.env.LOGGER__TO_FILE == 'true') {
    nestOption = {
      ...nestOption,
      logger: new LoggerProvider(),
    };
  }

  const app = await NestFactory.create(ApisModule, nestOption);

  app.enableShutdownHooks();

  shutdownHandler(Logger);

  if (process.env.SWAGGER__ENDPOINT == 'true') {
    Swagger(app);
  }

  await app.listen(3000);
}

bootstrap();
