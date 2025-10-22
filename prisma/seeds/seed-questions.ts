import { faker } from '@faker-js/faker';
import { PrismaClient } from '../../generated/prisma';


const prisma = new PrismaClient();

export const seedQuestions = async () => {
  const users = await prisma.user.findMany()

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
}
