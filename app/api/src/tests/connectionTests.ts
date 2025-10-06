import { PrismaClient } from '@prisma/client';

async function main() {
  const prisma = new PrismaClient();
  try {
    const result = await prisma.$queryRaw`SELECT now()`;
    console.log(`Connected: Current time: ${result}`);
  } catch (error) {
    console.error('Connection Failed', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
