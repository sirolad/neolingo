import * as Sentry from '@sentry/nextjs';

/**
 * Utility functions for Sentry error reporting
 */

/**
 * Report an error to Sentry with additional context
 */
export function reportError(error: Error, context?: Record<string, any>) {
  Sentry.captureException(error, {
    extra: context,
  });
}

/**
 * Report a message to Sentry
 */
export function reportMessage(
  message: string,
  level: 'info' | 'warning' | 'error' = 'info'
) {
  Sentry.captureMessage(message, level);
}

/**
 * Add breadcrumb for debugging
 */
export function addBreadcrumb(
  message: string,
  category?: string,
  data?: Record<string, any>
) {
  Sentry.addBreadcrumb({
    message,
    category: category || 'user',
    data,
    level: 'info',
  });
}

/**
 * Set user context for error tracking
 */
export function setUserContext(user: {
  id: string;
  email?: string;
  username?: string;
}) {
  Sentry.setUser(user);
}

/**
 * Clear user context
 */
export function clearUserContext() {
  Sentry.setUser(null);
}

/**
 * Set custom tags for error filtering
 */
export function setTag(key: string, value: string) {
  Sentry.setTag(key, value);
}

/**
 * Set custom context for error tracking
 */
export function setContext(key: string, context: Record<string, any>) {
  Sentry.setContext(key, context);
}

/**
 * Create a transaction for performance monitoring
 */
export function startTransaction(name: string, op: string) {
  return Sentry.startTransaction({ name, op });
}

/**
 * Test function to verify Sentry is working
 */
export function testSentry() {
  if (process.env.NODE_ENV === 'development') {
    console.log('🧪 Testing Sentry integration...');
    Sentry.captureMessage('Sentry test message from development', 'info');
  }
}
