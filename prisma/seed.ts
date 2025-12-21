import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  // Predefined roles
  const roles = ['CONTRIBUTOR', 'JURY', 'ADMIN', 'USER'];
  const languages = [
    {
      name: 'English',
      is_supported: true,
      icon: 'GB',
    },
    {
      name: 'French',
      is_supported: false,
      icon: 'FR',
    },
    {
      name: 'Spanish',
      is_supported: false,
      icon: 'ES',
    },
  ];

  const countries = [
    {
      name: 'Nigeria',
      icon: 'NG',
      neoCommunities: ['Yoruba', 'Igbo', 'Hausa'],
    },
    {
      name: 'Ghana',
      icon: 'GH',
      neoCommunities: [
        'twi',
        'Ewe',
        // 'Ga',
        // 'Dagbani',
      ],
    },
    {
      name: 'Kenya',
      icon: 'KE',
      neoCommunities: [
        'Swahili',
        'Kikuyu',
        // 'Maasai',
        // 'Meru',
      ],
    },
    {
      name: 'Benin',
      icon: 'BJ',
      neoCommunities: ['Fon', 'Yoruba'],
    },
    {
      name: 'Cameroon',
      icon: 'CM',
      neoCommunities: ['Fula', 'Bulu'],
    },
  ];

  const neoCommunities = [
    'Yoruba',
    'Igbo',
    'Hausa',
    'twi',
    'Ewe',
    'Swahili',
    'Kikuyu',
    'Fon',
    'Fula',
    'Bulu',
  ];

  for (const name of roles) {
    await prisma.role.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  console.log('Roles seeded successfully!');

  for (const language of languages) {
    await prisma.language.upsert({
      where: { name: language.name },
      update: { icon: language.icon, is_supported: language.is_supported },
      create: {
        name: language.name,
        icon: language.icon,
        is_supported: language.is_supported,
      },
    });
  }
  console.log('Languages seeded successfully!');

  for (const communityName of neoCommunities) {
    await prisma.neoCommunities.upsert({
      where: { name: communityName },
      update: {},
      create: { name: communityName },
    });
  }
  console.log('NeoCommunities seeded successfully!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
