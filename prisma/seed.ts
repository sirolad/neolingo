import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  // Predefined roles
  const roles = ['CONTRIBUTOR', 'JURY', 'ADMIN', 'USER'];

  for (const name of roles) {
    await prisma.role.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  console.log('Roles seeded successfully!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
