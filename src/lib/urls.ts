/**
 * URL utility functions for handling environment-specific URLs
 */

/**
 * Get the base URL for the current environment
 */
export function getBaseUrl(): string {
  // Check if we're in the browser
  if (typeof window !== 'undefined') {
    // In browser, use window.location.origin for current domain
    return window.location.origin;
  }

  // On server side, use environment variable or fallback
  if (isProduction()) {
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
  const baseUrl = getBaseUrl();
  const callbackUrl = `${baseUrl}/auth/callback`;

  // Debug logging in development
  if (isDevelopment()) {
    console.log('🔗 OAuth Callback URL:', callbackUrl);
    console.log('🌍 Base URL:', baseUrl);
    console.log('🔧 Environment:', process.env.NODE_ENV);
    console.log('🌐 Site URL:', process.env.NEXT_PUBLIC_SITE_URL);
  }

  return callbackUrl;
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
