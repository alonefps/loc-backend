import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@shared/modules/app.module';

describe('LocationsController (e2e)', () => {
  let app: INestApplication;
  let createdLocationId: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/locations (POST) - should create a location', () => {
    return request(app.getHttpServer())
      .post('/locations')
      .send({
        name: 'Test Location',
        description: 'Test Description',
        latitude: 40.785091,
        longitude: -73.968285,
        imageUrl: 'https://example.com/image.jpg',
      })
      .expect(201)
      .then((response) => {
        expect(response.body).toHaveProperty('id');
        expect(response.body.name).toBe('Test Location');
        createdLocationId = response.body.id;
      });
  });

  it('/locations (GET) - should list all locations', () => {
    return request(app.getHttpServer())
      .get('/locations')
      .expect(200)
      .then((response) => {
        expect(Array.isArray(response.body)).toBe(true);
      });
  });

  it('/locations/:id (GET) - should get a location by id', async () => {
    const createResponse = await request(app.getHttpServer()).post('/locations').send({
      name: 'Test Location',
      description: 'Test Description',
      latitude: 40.785091,
      longitude: -73.968285,
      imageUrl: 'https://example.com/image.jpg',
    });

    const locationId = createResponse.body.id;

    return request(app.getHttpServer())
      .get(`/locations/${locationId}`)
      .expect(200)
      .then((response) => {
        expect(response.body.id).toBe(locationId);
      });
  });

  it('/locations/:id (PUT) - should update a location', async () => {
    const createResponse = await request(app.getHttpServer()).post('/locations').send({
      name: 'Test Location',
      description: 'Test Description',
      latitude: 40.785091,
      longitude: -73.968285,
      imageUrl: 'https://example.com/image.jpg',
    });

    const locationId = createResponse.body.id;

    return request(app.getHttpServer())
      .put(`/locations/${locationId}`)
      .send({
        name: 'Updated Location',
      })
      .expect(200)
      .then((response) => {
        expect(response.body.name).toBe('Updated Location');
      });
  });

  it('/locations/:id (DELETE) - should delete a location', async () => {
    const createResponse = await request(app.getHttpServer()).post('/locations').send({
      name: 'Test Location',
      description: 'Test Description',
      latitude: 40.785091,
      longitude: -73.968285,
      imageUrl: 'https://example.com/image.jpg',
    });

    const locationId = createResponse.body.id;

    return request(app.getHttpServer()).delete(`/locations/${locationId}`).expect(204);
  });
});


