import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ApisModule } from './rest-apis/apis.module';
import { shutdownHandler } from './utils/shutdown-handler';
import { LoggerProvider } from './dal/logger/logger.providers';
import { Swagger } from './rest-apis/swagger.module';

async function bootstrap() {
  const app = await NestFactory.create(ApisModule);

  app.enableShutdownHooks();

  const logger = app.get(LoggerProvider);
  shutdownHandler(logger);

  if (process.env.SWAGGER__ENDPOINT == 'true') {
    Swagger(app);
  }

  await app.listen(3000);
}

bootstrap();
