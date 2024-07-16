import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { SurveyModule } from './survey.module';
import { SurveyService } from './survey.service';

describe('SurveyController', () => {
  let app: INestApplication;
  let surveyService = {
    findAll: () => [{ id: 1, title: 'Test Survey' }],
    create: () => ({ id: 1, title: 'Test Survey' }),
    findOne: () => ({ id: 1, title: 'Test Survey' }),
    update: () => ({ id: 1, title: 'Updated Survey' }),
    remove: () => ({ id: 1 }),
    createAnswers: () => ({ surveyPassing: {}, conflicts: [] }),
  };

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [SurveyModule],
    })
      .overrideProvider(SurveyService)
      .useValue(surveyService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('/GET survey', () => {
    return request(app.getHttpServer())
      .get('/survey')
      .set('Authorization', 'Bearer testToken')
      .expect(200)
      .expect(surveyService.findAll());
  });

  it('/POST survey', () => {
    return request(app.getHttpServer())
      .post('/survey')
      .send({ title: 'Test Survey' })
      .set('Authorization', 'Bearer testToken')
      .expect(201)
      .expect(surveyService.create());
  });

  it('/GET survey/:id', () => {
    return request(app.getHttpServer())
      .get('/survey/1')
      .set('Authorization', 'Bearer testToken')
      .expect(200)
      .expect(surveyService.findOne());
  });

  it('/PUT survey/:id', () => {
    return request(app.getHttpServer())
      .put('/survey/1')
      .send({ title: 'Updated Survey' })
      .set('Authorization', 'Bearer testToken')
      .expect(200)
      .expect(surveyService.update());
  });

  it('/DELETE survey/:id', () => {
    return request(app.getHttpServer())
      .delete('/survey/1')
      .set('Authorization', 'Bearer testToken')
      .expect(200)
      .expect(surveyService.remove());
  });

  it('/POST survey/:id/answers', () => {
    return request(app.getHttpServer())
      .post('/survey/1/answers')
      .send({ answers: [{ questionId: 1, text: 'Answer' }] })
      .set('Authorization', 'Bearer testToken')
      .expect(201)
      .expect(surveyService.createAnswers());
  });

  afterAll(async () => {
    await app.close();
  });
});
