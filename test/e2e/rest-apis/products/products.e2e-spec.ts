import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ApisModule } from '../../../../src/rest-apis/apis.module';
import { ProductCreationRequest } from 'src/rest-apis/requests/products/product-creation.request';
import { TRUNCATE_ALL_TABLES } from '../../utils';
import { DataSource } from 'typeorm';

describe('ApiController (e2e)', () => {
  let app: INestApplication;
  let dbClient: DataSource;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ApisModule],
    }).compile();

    app = moduleFixture.createNestApplication();
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
        const res = await request(app.getHttpServer())
          .post('/products')
          .send(productReq);

        expect(res.status).toBe(201);
        expect(res.body).toMatchSnapshot({
          data: {
            id: expect.any(String),
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
          },
        });
      });
    });

    describe('Get products', () => {
      it('should get a products', async () => {
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
