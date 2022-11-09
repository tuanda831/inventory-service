import { Product } from '../../dto/entity/product/product.entiry';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: DataSource,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: process.env.DB__HOST,
        port: parseInt(process.env.DB__PORT || '3306'),
        username: process.env.DB__USER,
        password: process.env.DB__PASSWORD,
        database: process.env.DB__NAME,
        synchronize: true,
        logging: process.env.DB__LOGGING === 'true',
        entities: [Product],
        subscribers: [],
        migrations: [],
      });

      return dataSource.initialize();
    },
  },
];
