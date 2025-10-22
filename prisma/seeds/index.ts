import { seedQuestions } from "./seed-questions"
import { seedUsers } from "./seed-users"
import { PrismaClient } from '../../generated/prisma';

const prisma = new PrismaClient();

export const seeds = async() => {
  /*
  RESETS DO BANCO DE DADOS
  */
  await prisma.question.deleteMany();
  await prisma.user.deleteMany();

  console.log('Database reset ✔️')

  
  /*
  SEEDS
  */
  await seedUsers()
  await seedQuestions()
}
