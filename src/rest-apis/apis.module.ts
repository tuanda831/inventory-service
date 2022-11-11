import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ProductController } from './controllers/products.controller';
import { ProductService } from '../services/products/product.service';
import { productRepositoryProviders } from '../repository/product/product.providers';
import { databaseProviders } from '../repository/database.providers';
import { ConfigModule } from '@nestjs/config';
import { GracefulShutdown } from './graceful-shutdown';
import { LoggerMiddleware } from './middlewares/logger.middleware';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [ProductController],
  providers: [
    ...databaseProviders,
    ...productRepositoryProviders,
    ProductService,
    GracefulShutdown,
  ],
})
export class ApisModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
