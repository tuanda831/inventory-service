import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { databaseProviders } from '../repository/database.providers';
import { productRepositoryProviders } from '../repository/product/product.providers';
import { eventBusClientProvider } from '../services/event-publisher/kafka.providers';
import { GracefulShutdown } from '../services/graceful-shutdown';
import { ProductService } from '../services/products/product.service';
import { ProductController } from './controllers/products.controller';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [ProductController],
  providers: [
    ...databaseProviders,
    ...productRepositoryProviders,
    ...eventBusClientProvider,
    ProductService,
    GracefulShutdown,
  ],
})
export class EventHandlerModule {}
