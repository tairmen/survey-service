import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ConflictModule } from './conflicts.module';
import { ConflictService } from './conflicts.service';

describe('ConflictController', () => {
  let app: INestApplication;
  let conflictService = {
    getConflicts: () => ([]),
    findConflictById: () => ({}),
  };

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [ConflictModule],
    })
      .overrideProvider(ConflictService)
      .useValue(conflictService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('/GET conflicts', () => {
    return request(app.getHttpServer())
      .get('/survey/conflicts')
      .set('Authorization', 'Bearer testToken')
      .expect(200)
      .expect(conflictService.getConflicts());
  });

  it('/GET conflicts/:id', () => {
    return request(app.getHttpServer())
      .get('/survey/conflicts/1')
      .set('Authorization', 'Bearer testToken')
      .expect(200)
      .expect(conflictService.findConflictById());
  });

  afterAll(async () => {
    await app.close();
  });
});
