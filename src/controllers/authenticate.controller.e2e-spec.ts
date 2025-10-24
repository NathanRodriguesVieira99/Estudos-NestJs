import { AppModule } from '@/app.module';
import { hashPassword } from '@/utils/hash';
import type { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';

describe('[POST] /sessions', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('should authenticate user ', async () => {
    /*
    Cria um usuário para autenticar.
    */
    await request(app.getHttpServer())
      .post('/accounts')
      .send({
        name: 'Jhon Doe',
        email: 'jhondoe@example.com',
        password: await hashPassword('12345678'),
      });

    const result = await request(app.getHttpServer()).post('/sessions').send({
      email: 'jhondoe@example.com',
      password: '12345678',
    });

    expect(result.statusCode).toBe(201);
    expect(result.body).toEqual({
      access_token: expect.any(String),
    });
  });
});
