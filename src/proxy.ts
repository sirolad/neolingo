import { type NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { prisma } from '@/lib/prisma';
import {
  completeOnboardingForUser,
  isOnboardingCompleted,
} from '@/lib/onboarding';
import { getUserContext } from '@/actions/auth';

const PUBLIC_ROUTES = [
  '/signin',
  '/signup',
  '/reset-password',
  '/auth/callback',
  '/splash',
  '/',
  '/onboarding/1',
  '/onboarding/2',
  '/onboarding/3',
  '/onboarding/4',
  '/onboarding/5',
];

const AUTH_ROUTES = [
  '/api/set-my-language',
  '/api/admin/assign-role',
  '/language-setup',
  '/neo-language-setup',
  '/home',
];

const roleAccess: Record<string, string[]> = {
  '/admin': ['ADMIN'],
  '/suggest': ['CONTRIBUTOR', 'ADMIN', 'JURY'],
  '/vote': ['JURY', 'ADMIN', 'CONTRIBUTOR'],
  '/requests': ['CONTRIBUTOR', 'ADMIN', 'JURY', 'USER'],
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

  let {
    data: { user },
  } = await supabase.auth.getUser();

  const { userRole, userTargetLanguage, userProfile } = user
    ? await getUserContext(user.id)
    : { userRole: null, userTargetLanguage: null, userProfile: null };
  const roleName = userRole?.role?.name;
  const uiLanguageId = userProfile?.uiLanguageId;
  const targetLanguageId = userTargetLanguage?.languageId;
  const isUserOnboardingCompleted = userProfile?.onboardingCompleted || false;
  let roleCopy = 'Explorer';
  switch (roleName) {
    case 'ADMIN':
      roleCopy = 'Admin';
      break;
    case 'CONTRIBUTOR':
      roleCopy = 'Curator';
      break;
    case 'JURY':
      roleCopy = 'Jury';
      break;
    case 'USER':
      roleCopy = 'Explorer';
      break;
    default:
      roleCopy = 'Explorer';
  }
  //@todo use new convention
  response.cookies.set(
    'extra',
    JSON.stringify({
      role: roleCopy,
      languageId: uiLanguageId,
      neoCommunityId: targetLanguageId,
      neoCommunityName: userTargetLanguage?.language?.name,
      neoCommunity: userTargetLanguage?.language,
    }),
    {
      httpOnly: true,
    }
  );
  const { pathname } = request.nextUrl;
  const authHeader = request.headers.get('authorization');

  if (!user && authHeader) {
    const token = authHeader.replace('Bearer ', '');
    const {
      data: { user: tokenUser },
    } = await supabase.auth.getUser(token);
    user = tokenUser;

    if (tokenUser) {
      await supabase.auth.setSession({
        access_token: token,
        refresh_token: '',
      });
      return response;
    }
  }

  if (user && isPublicRoute(pathname)) {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  if (!user && isAuthRoute(pathname)) {
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const redirectUrl = new URL('/signin', request.url);
    redirectUrl.searchParams.set('redirectTo', pathname);
    return NextResponse.redirect(redirectUrl);
  }

  if (
    user &&
    !pathname.startsWith('/api/') &&
    pathname !== '/language-setup' &&
    pathname !== '/neo-language-setup'
  ) {
    const onboardingCompleted = await isOnboardingCompleted(user.id);
    if (!onboardingCompleted) {
      // if (!uiLanguageId) {
      //   const redirectUrl = new URL('/language-setup', request.url);
      //   return NextResponse.redirect(redirectUrl);
      // } else
      if (!targetLanguageId) {
        const redirectUrl = new URL('/neo-language-setup', request.url);
        return NextResponse.redirect(redirectUrl);
      } else if (targetLanguageId && !isUserOnboardingCompleted) {
        await completeOnboardingForUser(user.id);
      }
    }
  }

  const userRoles = await prisma.userRole.findFirst({
    where: { userId: user?.id },
    include: { role: true },
  });
  const userRoleName = userRoles?.role?.name;
  // Check if the route requires a role
  const allowedRoles = Object.entries(roleAccess).find(([route]) =>
    pathname.startsWith(route)
  )?.[1];

  if (allowedRoles) {
    // Check if user role is allowed
    if (!allowedRoles.some(role => userRoleName === role)) {
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
