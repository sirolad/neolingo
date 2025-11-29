import { type NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { prisma } from '@/lib/prisma';

const PUBLIC_ROUTES = [
  '/signin',
  '/signup',
  '/reset-password',
  '/auth/callback',
  '/email-verification',
  '/splash',
  '/',
  '/onboarding/1',
  '/onboarding/2',
  '/onboarding/3',
  '/onboarding/4',
  '/onboarding/5',
];

const AUTH_ROUTES = ['/signin', '/signup'];

const roleAccess: Record<string, string[]> = {
  '/admin': ['ADMIN'],
  '/suggest': ['CONTRIBUTOR', 'ADMIN', 'JURY'],
  '/vote': ['JURY', 'ADMIN'],
};

function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.some(
    route => pathname === route || pathname.startsWith(route + '/')
  );
}

function isAuthRoute(pathname: string): boolean {
  return AUTH_ROUTES.some(
    route => pathname === route || pathname.startsWith(route + '/')
  );
}

export async function proxy(request: NextRequest) {
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: cookiesToSet => {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { pathname } = request.nextUrl;
  const authHeader = request.headers.get('authorization');

  if (!user && authHeader) {
    const token = authHeader.replace('Bearer ', '');
    const {
      data: { user: tokenUser },
    } = await supabase.auth.getUser(token);

    if (tokenUser) {
      await supabase.auth.setSession({
        access_token: token,
        refresh_token: '',
      });
      return response;
    }
  }

  if ((user && isAuthRoute(pathname)) || (user && isPublicRoute(pathname))) {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  if (!user && !isPublicRoute(pathname)) {
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const redirectUrl = new URL('/signin', request.url);
    redirectUrl.searchParams.set('redirectTo', pathname);
    return NextResponse.redirect(redirectUrl);
  }

  const userRoles = await prisma.userRole.findMany({
    where: { userId: user?.id },
    include: { role: true },
  });
  const userRoleNames = userRoles.map(ur => ur.role.name.toUpperCase());
  // Check if the route requires a role
  const allowedRoles = Object.entries(roleAccess).find(([route]) =>
    pathname.startsWith(route)
  )?.[1];

  if (allowedRoles) {
    // Check if user role is allowed
    if (!allowedRoles.some(role => userRoleNames.includes(role))) {
      if (pathname.startsWith('/api/')) {
        return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
      }
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  }
  return response;
}

export const config = {
  matcher: [
    // Matcher explanation:
    // This pattern matches all routes except:
    //   - Next.js internals (e.g. "_next")
    //   - Requests for static files (with extensions: html, htm, css, js (but not json), jpg, jpeg, webp, png, gif, svg, ttf, woff, woff2, ico, csv, doc, docx, xls, xlsx, zip, webmanifest)
    // The negative lookahead ensures these are excluded unless found in search params.
    // This helps prevent middleware from running on static assets and Next.js internals.
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
