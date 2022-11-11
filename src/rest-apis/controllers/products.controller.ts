import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Product } from '../../dto/entity/product/product.entiry';
import { ProductService } from '../../services/products/product.service';
import { BaseResponse, MetaDTO } from '../responses/basic.response';
import { ProductCreationRequest } from '../requests/products/product-creation.request';
import { ProductDTO } from '../responses/products/products.dto';
import {
  ApiOkResponseArray,
  ApiOkResponseObject,
} from '../swagger/api-ok-response';

@ApiTags('Products')
@Controller('/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

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
  @ApiOkResponseObject(ProductDTO, MetaDTO)
  async create(@Res() res: Response, @Body() reqBody: ProductCreationRequest) {
    const product = {
      ...reqBody,
      shortCode: `${reqBody.name.replace(' ', '-')}-${reqBody.sku}`,
    };

    const newProd: Product = await this.productService.save(product as Product);

    //TODO: Publish search indexing event

    return new BaseResponse<ProductDTO, MetaDTO>(res).created(
      'Product',
      newProd,
    );
  }
}
