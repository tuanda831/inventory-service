import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { EVENT__PRODUCT_CREATION } from 'src/dto/constants/events';
import { v4 } from 'uuid';
import { Product } from '../../dto/entity/product/product.entiry';
import { ProductService } from '../../services/products/product.service';
import { ProductCreationRequest } from '../requests/products/product-creation.request';
import { BaseResponse, MetaDTO } from '../responses/basic.response';
import { ProductDTO, ProductIdDTO } from '../responses/products/products.dto';
import {
  ApiOkResponseArray,
  ApiOkResponseObject,
} from '../swagger/api-ok-response';

@ApiTags('Products')
@Controller('/products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly eventClient: ClientKafka,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get Products with Pagination' })
  @ApiOkResponseArray(ProductDTO, MetaDTO)
  async gets(@Res() res: Response): Promise<void> {
    const prodEntity: Product[] = await this.productService.gets();

    return new BaseResponse<ProductDTO[], MetaDTO>(res).success(prodEntity, {
      totalCount: 0,
      offset: 0,
      limit: 0,
    });
  }

  @Post()
  @ApiOperation({ summary: 'Create Product' })
  @ApiOkResponseObject(ProductIdDTO, MetaDTO)
  async create(@Res() res: Response, @Body() reqBody: ProductCreationRequest) {
    const product = {
      ...reqBody,
      id: v4(),
      shortCode: `${reqBody.name.replace(' ', '-')}-${reqBody.sku}`,
    };

    this.eventClient.emit<Product[]>(EVENT__PRODUCT_CREATION, [product]);

    return new BaseResponse<ProductIdDTO, MetaDTO>(res).created('Product', {
      id: product.id,
    });
  }
}
