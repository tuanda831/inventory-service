import { Inject, Injectable } from '@nestjs/common';
import { Product } from 'src/dto/entity/product/product.entiry';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @Inject(Repository<Product>)
    private productRepository: Repository<Product>,
  ) {}

  gets(): Promise<Product[]> {
    return this.productRepository.find();
  }

  save(product: Product): Promise<Product> {
    return this.productRepository.save(product);
  }
}
