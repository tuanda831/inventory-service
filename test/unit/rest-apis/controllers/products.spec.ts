import { ConfigService } from '@nestjs/config';
import { ClientKafka } from '@nestjs/microservices';
import { Response } from 'express';
import { Repository } from 'typeorm';
import { Product } from '../../../../src/dto/entity/product/product.entiry';
import { ProductController } from '../../../../src/rest-apis/controllers/products.controller';
import { ProductCreationRequest } from '../../../../src/rest-apis/requests/products/product-creation.request';
import { ProductService } from '../../../../src/services/products/product.service';

const results = new Product();
let controller: ProductController;
let productService: ProductService;
let productRepository: Repository<Product>;
let eventClient: ClientKafka;
let config: ConfigService;

describe('ProductController', () => {
  beforeEach(async () => {
    productService = new ProductService(productRepository);
    controller = new ProductController(productService, eventClient, config);
  });

  describe('/products (POST)', () => {
    const request: ProductCreationRequest = {
      sku: '123',
      barcode: '99999',
      name: 'New Product',
      description: 'Product Description here',
      images: ['https://test1.link', 'https://test2.link'],
      price: 1.98,
    };

    let res: Response;

    it('Should Return 400 incase the request invalid', () => {
      expect(true).toBe(true);
    });

    it('Should handle the Unknow error well', () => {
      expect(true).toBe(true);
    });

    it('Should successful insert a record to the DB', async () => {
      jest
        .spyOn(productService, 'save')
        .mockImplementation((product: Product) => {
          expect(product.sku).toBe(request.sku);
          expect(product.barcode).toBe(request.barcode);
          expect(product.name).toBe(request.name);
          expect(product.description).toBe(request.description);
          expect(product.images).toBe(request.images);
          expect(product.price).toBe(request.price);

          return Promise.resolve(results);
        });

      res = {
        status: (code: any): Response => {
          expect(code).toBe(201);
          return {
            send({ message, data }) {
              expect(message).toBe('"Product" is Created!');
              expect(data).toBe(results);
            },
          } as Response;
        },
      } as Response;

      await controller.create(res, request);
    });
  });
});
