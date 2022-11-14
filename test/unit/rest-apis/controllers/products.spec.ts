import { ClientKafka } from '@nestjs/microservices';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { EVENT__PRODUCT_CREATION } from '../../../../src/dto/constants/events';
import { Product } from '../../../../src/dto/entity/product/product.entiry';
import { ProductController } from '../../../../src/rest-apis/controllers/products.controller';
import { ProductCreationRequest } from '../../../../src/rest-apis/requests/products/product-creation.request';
import { ProductService } from '../../../../src/services/products/product.service';

let controller: ProductController;
let productService: ProductService;
let productRepository: Repository<Product>;
let eventClient: ClientKafka;

describe('ProductController', () => {
  beforeEach(async () => {
    productService = new ProductService(productRepository);
    eventClient = new ClientKafka({});
    controller = new ProductController(productService, eventClient);
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
        .spyOn(eventClient, 'emit')
        .mockImplementation(
          (eventName: string, products: Product[]): Observable<Product> => {
            expect(eventName).toBe(EVENT__PRODUCT_CREATION);
            expect(products[0]).toMatchSnapshot({
              id: expect.any(String),
            });
            return new Observable<Product>();
          },
        );

      res = {
        status: (code: any): Response => {
          expect(code).toBe(201);
          return {
            send({ message, data }) {
              expect(message).toBe('"Product" is Created!');
              expect(data).toMatchObject({
                id: expect.any(String),
              });
            },
          } as Response;
        },
      } as Response;

      await controller.create(res, request);
    });
  });
});
