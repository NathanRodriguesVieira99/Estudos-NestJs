import { AppModule } from '@/app.module';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { hashPassword } from '@/utils/hash';
import { faker } from '@faker-js/faker';
import type { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import request from 'supertest';

describe('[GET] /questions', () => {
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

  it('should fetch recent questions', async () => {
    /*
    Cria um usuário para obter token de autenticação.
    */
    const user = await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: await hashPassword('12345678'),
      },
    });

    const access_token = jwt.sign({ sub: user.id });

    // cria slugs únicos para as questions.
    const slug1 = `slug-${faker.string.uuid()}`;
    const slug2 = `slug-${faker.string.uuid()}`;

    /**
     Cria várias questions.
     */
    await prisma.question.createMany({
      data: [
        {
          title: 'Question 01',
          slug: slug1,
          content: 'Question Content',
          authorId: user.id,
        },
        {
          title: 'Question 02',
          slug: slug2,
          content: 'Question Content',
          authorId: user.id,
        },
      ],
    });

    /**
     Busca as questions.
     */
    const result = await request(app.getHttpServer())
      .get('/questions')
      .set('Authorization', `Bearer ${access_token}`)
      .send();

    expect(result.statusCode).toBe(200);
    expect(result.body.questions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ title: 'Question 01' }),
        expect.objectContaining({ title: 'Question 02' }),
      ]),
    );
  });
});
