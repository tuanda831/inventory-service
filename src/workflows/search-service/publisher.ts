import { Inject, Injectable } from '@nestjs/common';
import { WorkflowClient } from '@temporalio/client';
import { Product } from '../../dto/entity/product/product.entiry';

@Injectable()
export class SearchServicePublisher {
  constructor(
    @Inject(WorkflowClient)
    private client: WorkflowClient,
  ) {}

  addProductToIndex(product: Product) {
    return this.client.signalWithStart('search-index-new-product', {
      signal: 'search-index-new-product',
      workflowId: `search-index-new-product-${product.id}`,
      taskQueue: 'search-index-new-product',
    });
  }
}
