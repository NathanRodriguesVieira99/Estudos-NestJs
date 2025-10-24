import { AppModule } from '@/app.module';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { faker } from '@faker-js/faker';
import type { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import request from 'supertest';

describe('[POST] /questions', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwt: JwtService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    prisma = moduleRef.get(PrismaService);
    jwt = moduleRef.get(JwtService);

    await app.init();
  });

  it('should create a question', async () => {
    const user = await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: '12345678',
      },
    });

    const access_token = jwt.sign({ sub: user.id });

    const result = await request(app.getHttpServer())
      .post('/questions')
      .set('Authorization', `Bearer ${access_token}`)
      .send({
        title: faker.lorem.words(4),
        content: faker.lorem.paragraph(),
      });

    expect(result.statusCode).toBe(201);
  });
});
