import createClient from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const token =
    req.headers.get('authorization')?.replace('Bearer ', '') || undefined;
  const supabase = token ? await createClient(token) : await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  return NextResponse.json(
    { data: user, message: 'User fetched successfully' },
    { status: 200 }
  );
}
