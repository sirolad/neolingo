import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';
import { Select } from '@radix-ui/react-select';
import { NeoLanguage, NeoLanguageOption } from '@/types/dictionary';

export async function GET(req: NextRequest) {
  //  return NextResponse.json({ languages: [] });
  const prisma = new PrismaClient();

  const languages = await prisma.country.findMany({
    select: {
      id: true,
      name: true,
      icon: true,
      neoCommunities: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  await prisma.$disconnect();

  return NextResponse.json({ languages });
}
