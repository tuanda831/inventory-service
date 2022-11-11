import { Inject, Injectable } from '@nestjs/common';
import { Product } from '../../dto/entity/product/product.entiry';
import { SearchServicePublisher } from '../../workflows/search-service/publisher';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @Inject(Repository<Product>)
    private productRepository: Repository<Product>,
    @Inject(SearchServicePublisher)
    private searchPublisher: SearchServicePublisher,
  ) {}

  gets(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async save(product: Product): Promise<Product> {
    await this.searchPublisher.addProductToIndex(product);
    return this.productRepository.save(product);
  }
}
