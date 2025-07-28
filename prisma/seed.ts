import { PrismaClient, type User } from '../generated/prisma'; // !! FIX atualizar type User por uma entidade
import { faker } from '@faker-js/faker';
import { hashPassword } from '../src/utils/hash';

const prisma = new PrismaClient();

const seed = async () => {
    await prisma.user.deleteMany();
    await prisma.question.deleteMany();

    const users: User[] = [];

    for (let i = 0; i < 5; i++) {
        const user = await prisma.user.create({
            data: {
                name: faker.person.fullName(),
                email: faker.internet.email(),
                password: await hashPassword('12345678'),
            },
        });

        users.push(user);
    }

    for (let i = 0; i < 10; i++) {
        const author = users[Math.floor(Math.random() * users.length)];
        await prisma.question.create({
            data: {
                title: faker.lorem.sentence(),
                slug: faker.string.uuid(),
                content: faker.lorem.paragraph(),
                authorId: author.id,
            },
        });
    }
};

seed()
    .then(() => {
        console.log('Database seeded 🌱 ');
    })
    .catch(async (err) => {
        console.error(err);
        await prisma.$disconnect();
        process.exit(1);
    });
