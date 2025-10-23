import { NextRequest, NextResponse } from 'next/server';
import createClient from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const { searchParams, origin } = requestUrl;
  const code = searchParams.get('code');
  const next = searchParams.get('next') || '/home';

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error('Auth callback error:', error);
      // Redirect to signin with error using the request origin
      return NextResponse.redirect(
        new URL('/signin?error=auth_callback_failed', origin)
      );
    }

    if (data?.user) {
      console.log('✅ Auth callback successful for user:', data.user.email);
    }
  }

  // Redirect to home using the request origin to ensure same domain
  return NextResponse.redirect(new URL(next, origin));
}
