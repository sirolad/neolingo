import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: process.env.NODE_ENV === 'development',

  // Set environment
  environment: process.env.NODE_ENV,

  // Set release version
  release: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || 'development',

  // Filter out common non-errors
  beforeSend(event, hint) {
    // Filter out AuthSessionMissingError as it's expected behavior
    if (hint.originalException?.message?.includes('Auth session missing')) {
      return null;
    }

    return event;
  },
});
