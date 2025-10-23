/**
 * Debug utility to test URL generation
 * This can be called from the browser console to debug URL issues
 */

import { getBaseUrl, getCallbackUrl } from './urls';

export function debugUrls() {
  console.log('🔍 URL Debug Information:');
  console.log('========================');
  console.log(
    '🌍 Current URL:',
    typeof window !== 'undefined' ? window.location.href : 'Server-side'
  );
  console.log('🔧 NODE_ENV:', process.env.NODE_ENV);
  console.log('🌐 NEXT_PUBLIC_SITE_URL:', process.env.NEXT_PUBLIC_SITE_URL);
  console.log('🏠 Base URL:', getBaseUrl());
  console.log('🔗 Callback URL:', getCallbackUrl());
  console.log('========================');

  return {
    baseUrl: getBaseUrl(),
    callbackUrl: getCallbackUrl(),
    nodeEnv: process.env.NODE_ENV,
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
    currentUrl:
      typeof window !== 'undefined' ? window.location.href : 'Server-side',
  };
}

// Make it available globally in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  (window as Record<string, unknown>).debugUrls = debugUrls;
}
