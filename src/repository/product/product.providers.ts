import { DataSource, Repository } from 'typeorm';
import { Product } from '../../dto/entity/product/product.entiry';

export const productRepositoryProviders = [
  {
    provide: Repository<Product>,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Product),
    inject: [DataSource],
  },
];
