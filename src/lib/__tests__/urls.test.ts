import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  getBaseUrl,
  getCallbackUrl,
  getFullUrl,
  isDevelopment,
  isProduction,
} from '../urls';

describe('urls utility', () => {
  const originalEnv = process.env;
  const originalWindow = global.window;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
    global.window = originalWindow;
    vi.restoreAllMocks();
  });

  describe('getBaseUrl', () => {
    it('should return window.location.origin if in browser window', () => {
      global.window = {
        location: { origin: 'https://browser-origin.com' },
      } as any;
      expect(getBaseUrl()).toBe('https://browser-origin.com');
    });

    it('should return NEXT_PUBLIC_SITE_URL in production server', () => {
      global.window = undefined as any;
      vi.stubEnv('NODE_ENV', 'production');
      process.env.NEXT_PUBLIC_SITE_URL = 'https://custom-site.com';
      expect(getBaseUrl()).toBe('https://custom-site.com');
    });

    it('should return default vercel url in production server if no env var', () => {
      global.window = undefined as any;
      vi.stubEnv('NODE_ENV', 'production');
      delete process.env.NEXT_PUBLIC_SITE_URL;
      expect(getBaseUrl()).toBe('https://neolingo-swart.vercel.app');
    });

    it('should return localhost in development server', () => {
      global.window = undefined as any;
      vi.stubEnv('NODE_ENV', 'development');
      expect(getBaseUrl()).toBe('http://localhost:3000');
    });
  });

  describe('getCallbackUrl', () => {
    it('should return the callback url appended to base url', () => {
      global.window = { location: { origin: 'https://test.com' } } as any;
      expect(getCallbackUrl()).toBe('https://test.com/auth/callback');
    });

    it('should log correctly in development without crashing', () => {
      global.window = undefined as any;
      vi.stubEnv('NODE_ENV', 'development');
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

      const url = getCallbackUrl();

      expect(url).toBe('http://localhost:3000/auth/callback');
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe('getFullUrl', () => {
    it('should combine base url with path', () => {
      global.window = { location: { origin: 'https://test.com' } } as any;
      expect(getFullUrl('/api/test')).toBe('https://test.com/api/test');
    });
  });

  describe('isDevelopment', () => {
    it('should return true if NODE_ENV is development', () => {
      vi.stubEnv('NODE_ENV', 'development');
      expect(isDevelopment()).toBe(true);
    });

    it('should return false if NODE_ENV is not development', () => {
      vi.stubEnv('NODE_ENV', 'production');
      expect(isDevelopment()).toBe(false);
    });
  });

  describe('isProduction', () => {
    it('should return true if NODE_ENV is production', () => {
      vi.stubEnv('NODE_ENV', 'production');
      expect(isProduction()).toBe(true);
    });

    it('should return false if NODE_ENV is not production', () => {
      vi.stubEnv('NODE_ENV', 'development');
      expect(isProduction()).toBe(false);
    });
  });
});
