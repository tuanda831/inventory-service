import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export const Swagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle(process.env.SWAGGER__TITLE || 'Swagger Title (SWAGGER__TITLE)')
    .setDescription(
      process.env.SWAGGER__DESC || 'The API description (SWAGGER__DESC)',
    )
    .setVersion(process.env.SWAGGER__VERSION || '1.0 (SWAGGER__VERSION)')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(process.env.SWAGGER__PATH || 'docs', app, document);
};
