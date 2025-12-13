import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';

export async function GET(req: NextRequest) {
  const prisma = new PrismaClient();

  const languages = await prisma.language.findMany({
    select: {
      id: true,
      name: true,
      icon: true,
    },
  });
  // await prisma.$disconnect();

  return NextResponse.json({ languages });
}
