import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ProductController } from './controllers/products.controller';
import { ProductService } from '../services/products/product.service';
import { productRepositoryProviders } from '../dal/repository/product/product.providers';
import { databaseProviders } from '../dal/repository/database.providers';
import { ConfigModule } from '@nestjs/config';
import { GracefullShutdown } from './graceful-shutdown.providers';
import { LoggerMiddleware } from './middlewares/logger.middleware';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [ProductController],
  providers: [
    ...databaseProviders,
    ...productRepositoryProviders,
    ProductService,
    GracefullShutdown,
  ],
})
export class ApisModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
