import { INestApplication } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { from, Observable } from 'rxjs';
import * as request from 'supertest';
import { DataSource } from 'typeorm';
import { EVENT__PRODUCT_CREATION } from '../../src/dto/constants/events';
import { Product } from '../../src/dto/entity/product/product.entiry';
import { ProductController } from '../../src/event-handlers/controllers/products.controller';
import { ApisModule } from '../../src/rest-apis/apis.module';
import { ProductCreationRequest } from '../../src/rest-apis/requests/products/product-creation.request';
import { ProductService } from '../../src/services/products/product.service';
import { TRUNCATE_ALL_TABLES } from './utils';

describe('ApiController (e2e)', () => {
  let app: INestApplication;
  let dbClient: DataSource;
  let eventClient: ClientKafka;
  let productService: ProductService;
  let productInPost: Product[];

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ApisModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    eventClient = app.get(ClientKafka);
    productService = app.get(ProductService);

    await app.init();

    app.enableShutdownHooks();

    dbClient = app.get(DataSource);
    await dbClient.query(TRUNCATE_ALL_TABLES);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Products', () => {
    describe('Get empty products', () => {
      it('should get empty list', async () => {
        const res = await request(app.getHttpServer()).get('/products');
        expect(res.status).toBe(200);
        expect(res.body).toMatchSnapshot();
      });
    });

    describe('Create product', () => {
      const productReq: ProductCreationRequest = {
        sku: '123',
        barcode: '99999',
        name: 'New Product',
        description: 'Product Description here',
        images: ['https://test1.link', 'https://test2.link'],
        price: 1.98,
      };

      it('should create a product', async () => {
        jest
          .spyOn(eventClient, 'emit')
          .mockImplementation(
            (eventName: string, products: Product[]): Observable<any> => {
              expect(eventName).toBe(EVENT__PRODUCT_CREATION);
              expect(products[0]).toMatchSnapshot({
                id: expect.any(String),
              });

              productInPost = products;

              return from([]);
            },
          );

        const res = await request(app.getHttpServer())
          .post('/products')
          .send(productReq);

        expect(res.status).toBe(201);
        expect(res.body).toMatchSnapshot({
          data: {
            id: expect.any(String),
          },
        });
      });
    });

    describe('Get products', () => {
      it('should get a products', async () => {
        const handler = new ProductController(productService);
        await handler.create(productInPost);

        const res = await request(app.getHttpServer()).get('/products');
        expect(res.status).toBe(200);
        expect(res.body).toMatchSnapshot({
          data: [
            {
              id: expect.any(String),
              createdAt: expect.any(String),
              updatedAt: expect.any(String),
            },
          ],
        });
      });
    });
  });
});
