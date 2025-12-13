import createClient from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { assignRole } from '@/lib/roles';
import z from 'zod';

const BodySchema = z.object({
  languageId: z.number(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsedBody = BodySchema.parse(body);

    const { languageId } = parsedBody;

    const token =
      req.headers.get('authorization')?.replace('Bearer ', '') || undefined;
    const supabase = token ? await createClient(token) : await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const dbUser = await prisma.userProfile.upsert({
      where: { userId: user.id },
      update: { languageId },
      create: { userId: user.id, languageId },
    });

    return NextResponse.json({ success: true, user: dbUser });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: err.message || 'Validation error' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: err.message || 'Server error' },
      { status: 500 }
    );
  }
}
