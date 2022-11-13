import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { Product } from '../dto/entity/product/product.entiry';

export const databaseProviders = [
  {
    provide: DataSource,
    useFactory: async (config: ConfigService) => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: config.get<string>('DB__HOST'),
        port: config.get<number>('DB__PORT'),
        username: config.get<string>('DB__USER'),
        password: config.get<string>('DB__PASSWORD'),
        database: config.get<string>('DB__NAME'),
        synchronize: true,
        logging: config.get<boolean>('DB__LOGGING'),
        entities: [Product],
        subscribers: [],
        migrations: [],
      });

      return dataSource.initialize();
    },
    inject: [ConfigService],
  },
];
