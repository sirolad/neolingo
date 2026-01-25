import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as Sentry from '@sentry/nextjs';

// Create a mock for the Supabase auth methods
const mockResetPasswordForEmail = vi.fn();

// Mock Supabase server - must be before importing the module
vi.mock('@/lib/supabase/server', () => ({
  default: vi.fn(() =>
    Promise.resolve({
      auth: {
        resetPasswordForEmail: mockResetPasswordForEmail,
      },
    })
  ),
}));

// Import after mocks are defined
import { resetPassword } from '../auth';

describe('auth actions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockResetPasswordForEmail.mockReset();
  });

  describe('resetPassword', () => {
    it('should successfully send reset password email', async () => {
      mockResetPasswordForEmail.mockResolvedValue({
        data: {},
        error: null,
      });

      const result = await resetPassword('test@example.com');

      expect(result.success).toBe(true);
      expect(result.error).toBeUndefined();
      expect(mockResetPasswordForEmail).toHaveBeenCalledWith(
        'test@example.com',
        expect.objectContaining({
          redirectTo: expect.stringContaining('/reset-password'),
        })
      );
    });

    it('should handle error when reset password fails', async () => {
      const mockError = { message: 'User not found' };
      mockResetPasswordForEmail.mockResolvedValue({
        data: {},
        error: mockError,
      });

      const result = await resetPassword('nonexistent@example.com');

      expect(result.success).toBe(false);
      expect(result.error).toBe('User not found');
    });

    it('should handle unexpected errors', async () => {
      mockResetPasswordForEmail.mockRejectedValue(new Error('Network error'));

      const result = await resetPassword('test@example.com');

      expect(result.success).toBe(false);
      expect(result.error).toBe('An unexpected error occurred');
    });

    it('should call Sentry on error', async () => {
      const mockError = { message: 'Database error' };
      mockResetPasswordForEmail.mockResolvedValue({
        data: {},
        error: mockError,
      });

      await resetPassword('test@example.com');

      expect(Sentry.captureException).toHaveBeenCalledWith(
        mockError,
        expect.objectContaining({
          tags: { operation: 'resetPassword' },
        })
      );
    });
  });
});
