/**
 * URL utility functions for handling environment-specific URLs
 */

/**
 * Get the base URL for the current environment
 */
export function getBaseUrl(): string {
  // In production, use the environment variable or fallback
  if (process.env.NODE_ENV === 'production') {
    return (
      process.env.NEXT_PUBLIC_SITE_URL || 'https://neolingo-swart.vercel.app'
    );
  }

  // In development, use localhost
  return 'http://localhost:3000';
}

/**
 * Get the OAuth callback URL
 */
export function getCallbackUrl(): string {
  return `${getBaseUrl()}/auth/callback`;
}

/**
 * Get the full URL for a given path
 */
export function getFullUrl(path: string): string {
  return `${getBaseUrl()}${path}`;
}

/**
 * Check if we're in development mode
 */
export function isDevelopment(): boolean {
  return process.env.NODE_ENV === 'development';
}

/**
 * Check if we're in production mode
 */
export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production';
}
