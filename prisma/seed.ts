import { PrismaClient } from '../src/generated/prisma';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import 'dotenv/config';

const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // Predefined roles
  const roles = ['CONTRIBUTOR', 'JURY', 'ADMIN', 'EXPLORER'];
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

  const neoCommunities = [
    {
      name: 'Yoruba',
      short: 'YR',
      flagIcon: 'NG',
    },
    {
      name: 'Igbo',
      short: 'IG',
      flagIcon: 'NG',
    },
    {
      name: 'Hausa',
      short: 'HA',
      flagIcon: 'NG',
    },
    {
      name: 'twi',
      short: 'TW',
      flagIcon: 'GH',
    },
    {
      name: 'Ewe',
      short: 'EW',
      flagIcon: 'GH',
    },
    {
      name: 'Swahili',
      short: 'SW',
      flagIcon: 'KE',
    },
    {
      name: 'Kikuyu',
      short: 'KK',
      flagIcon: 'KE',
    },
    {
      name: 'Fon',
      short: 'FO',
      flagIcon: 'BJ',
    },
    {
      name: 'Fula',
      short: 'FU',
      flagIcon: 'SN',
    },
    {
      name: 'Bulu ',
      short: 'BU',
      flagIcon: 'CM',
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

  // Seed UI Languages
  const uiLanguages = [
    { name: 'English', code: 'en', icon: 'GB', is_supported: true },
    { name: 'French', code: 'fr', icon: 'FR', is_supported: false },
    { name: 'Spanish', code: 'es', icon: 'ES', is_supported: false },
  ];
  for (const uiLang of uiLanguages) {
    await prisma.uILanguage.upsert({
      where: { code: uiLang.code },
      update: { icon: uiLang.icon, is_supported: uiLang.is_supported },
      create: uiLang,
    });
  }
  console.log('UI Languages seeded successfully!');

  // Seed HRL Languages (like English)
  for (const language of languages) {
    await prisma.language.upsert({
      where: { name: language.name },
      update: { icon: language.icon, is_supported: language.is_supported },
      create: {
        name: language.name,
        code: language.name.toLowerCase().substring(0, 3),
        type: 'HRL',
        icon: language.icon,
        is_supported: language.is_supported,
      },
    });
  }
  console.log('Languages seeded successfully!');

  // Seed LRL Languages (Neo Communities)
  for (const communityName of neoCommunities) {
    await prisma.language.upsert({
      where: { name: communityName.name },
      update: {},
      create: {
        name: communityName.name,
        code: communityName.name.toLowerCase().substring(0, 3),
        type: 'LRL',
        short: communityName.short,
        icon: communityName.flagIcon,
        is_supported: true,
      },
    });
  }
  console.log('LRL Languages seeded successfully!');

  const partsOfSpeech = [
    { name: 'Noun', code: 'N' },
    { name: 'Verb', code: 'V' },
    { name: 'Adjective', code: 'ADJ' },
    { name: 'Adverb', code: 'ADV' },
    { name: 'Pronoun', code: 'PRO' },
    { name: 'Preposition', code: 'PREP' },
    { name: 'Conjunction', code: 'CONJ' },
    { name: 'Interjection', code: 'INT' },
  ];

  for (const pos of partsOfSpeech) {
    await prisma.partOfSpeech.upsert({
      where: { code: pos.code },
      update: {},
      create: pos,
    });
  }
  console.log('Parts of Speech seeded successfully!');

  const domains = [
    'General',
    'Technology',
    'Medicine',
    'Law',
    'Agriculture',
    'Education',
    'Business',
    'Science',
  ];

  for (const domainName of domains) {
    await prisma.domain.upsert({
      where: { name: domainName },
      update: {},
      create: { name: domainName },
    });
  }
  console.log('Domains seeded successfully!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
