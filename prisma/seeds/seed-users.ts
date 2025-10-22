import { faker } from '@faker-js/faker';
import { PrismaClient, type User } from '../../generated/prisma';
import { hashPassword } from '../../src/utils/hash';

const prisma = new PrismaClient();

export const seedUsers = async () => {
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
return users
}
