import { PrismaClient} from '../generated/prisma';
import { seeds } from './seeds';

const prisma = new PrismaClient();

const seed = async () => {
  await seeds()
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
