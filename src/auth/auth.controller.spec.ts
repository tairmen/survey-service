import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AuthModule } from './auth.module';
import { INestApplication } from '@nestjs/common';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let app: INestApplication;
  let authService = { login: () => ({ accessToken: 'testToken' }) };

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
    })
      .overrideProvider(AuthService)
      .useValue(authService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('/POST login', () => {
    return request(app.getHttpServer())
      .post('/login')
      .send({ username: 'test', password: 'test' })
      .expect(201)
      .expect({
        accessToken: 'testToken',
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
