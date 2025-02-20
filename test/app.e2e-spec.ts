import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request, { Response } from 'supertest'; // Импортируем Response
import { AppModule } from '../src/app.module';
import * as http from 'http'; // Добавляем импорт http

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', async () => {
    const response: Response = await request(app.getHttpServer() as http.Server) // Явно кастуем к http.Server
      .get('/')
      .expect(200);

    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello World!');
  });

  afterAll(async () => {
    await app.close();
  });
});
