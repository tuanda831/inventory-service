import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const SwaggerFactory = (
  app: INestApplication,
  config: ConfigService,
) => {
  if (!config.get<boolean>('SWAGGER__ENABLE')) {
    return;
  }

  const swaggerConfig = new DocumentBuilder()
    .setTitle(config.getOrThrow<string>('SWAGGER__TITLE'))
    .setDescription(config.getOrThrow<string>('SWAGGER__DESC'))
    .setVersion(config.getOrThrow<string>('SWAGGER__VERSION'))
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(
    config.get<string>('SWAGGER__PATH') || 'docs',
    app,
    document,
  );
};
