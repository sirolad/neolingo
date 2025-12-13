import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  // Predefined roles
  const roles = ['CONTRIBUTOR', 'JURY', 'ADMIN', 'USER'];
  const languages = [
    {
      name: 'English',
      icon: 'GB',
    },
    {
      name: 'French',
      icon: 'FR',
    },
    {
      name: 'Spanish',
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
      update: {},
      create: { name: language.name, icon: language.icon },
    });
  }
  console.log('Languages seeded successfully!');

  for (const country of countries) {
    const createdCountry = await prisma.country.upsert({
      where: { name: country.name },
      update: {},
      create: { name: country.name, icon: country.icon },
    });

    for (const neoCommunityName of country.neoCommunities) {
      await prisma.neoCommunities.upsert({
        where: {
          name_countryId: {
            name: neoCommunityName,
            countryId: createdCountry.id,
          },
        },
        update: {},
        create: {
          name: neoCommunityName,
          countryId: createdCountry.id,
        },
      });
    }
  }
  console.log('Countries and NeoCommunities seeded successfully!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
