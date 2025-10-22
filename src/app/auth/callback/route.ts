import { NextRequest, NextResponse } from 'next/server';
import createClient from '@/lib/supabase/server';
import { getBaseUrl } from '@/lib/urls';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') || '/home';

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error('Auth callback error:', error);
      // Redirect to signin with error
      return NextResponse.redirect(
        new URL('/signin?error=auth_callback_failed', getBaseUrl())
      );
    }
  }

  // Redirect to  home
  return NextResponse.redirect(new URL(next, getBaseUrl()));
}
