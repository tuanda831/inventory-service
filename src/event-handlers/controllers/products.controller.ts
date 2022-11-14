import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { EVENT__PRODUCT_CREATION } from '../../dto/constants/events';
import { Product } from '../../dto/entity/product/product.entiry';
import { ProductService } from '../../services/products/product.service';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @EventPattern(EVENT__PRODUCT_CREATION)
  async create(@Payload() products: Product[]) {
    Logger.log(
      JSON.stringify({
        eventName: EVENT__PRODUCT_CREATION,
        payload: products,
      }),
    );

    await this.productService.saveBulk(products);
  }
}
