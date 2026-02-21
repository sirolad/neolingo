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

// Mock Sentry
vi.mock('@sentry/nextjs', () => ({
  captureException: vi.fn(),
}));

// Mock Prisma
vi.mock('@/lib/prisma', () => ({
  default: {
    $transaction: vi.fn(),
    uILanguage: { findMany: vi.fn() },
    userProfile: { upsert: vi.fn(), findFirst: vi.fn() },
    userRole: { findFirst: vi.fn(), create: vi.fn() },
    role: { findUnique: vi.fn() },
    userTargetLanguage: { findFirst: vi.fn() },
  },
}));
import prisma from '@/lib/prisma';

// Import after mocks are defined
import {
  resetPassword,
  setCompleteOnboardingForUser,
  isUserOnboardingCompleted,
  getUserContext,
} from '../auth';

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

  describe('setCompleteOnboardingForUser', () => {
    it('should complete onboarding and assign default role', async () => {
      // Setup mocks
      (prisma.$transaction as any).mockImplementation(async (cb: any) =>
        cb(prisma)
      );
      (prisma.uILanguage.findMany as any).mockResolvedValue([{ id: 1 }]);
      (prisma.userProfile.upsert as any).mockResolvedValue({});
      (prisma.userRole.findFirst as any).mockResolvedValue(null);
      (prisma.role.findUnique as any).mockResolvedValue({ id: 'role-1' });
      (prisma.userRole.create as any).mockResolvedValue({});

      await setCompleteOnboardingForUser('user-1');

      expect(prisma.userProfile.upsert).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { userId: 'user-1' },
          update: { onboardingCompleted: true },
        })
      );
      expect(prisma.userRole.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: { userId: 'user-1', roleId: 'role-1' },
        })
      );
    });

    it('should skip role assignment if user already has a role', async () => {
      (prisma.$transaction as any).mockImplementation(async (cb: any) =>
        cb(prisma)
      );
      (prisma.uILanguage.findMany as any).mockResolvedValue([]);
      (prisma.userProfile.upsert as any).mockResolvedValue({});
      (prisma.userRole.findFirst as any).mockResolvedValue({
        id: 'existing-role',
      });

      await setCompleteOnboardingForUser('user-1');

      expect(prisma.role.findUnique).not.toHaveBeenCalled();
      expect(prisma.userRole.create).not.toHaveBeenCalled();
    });
  });

  describe('isUserOnboardingCompleted', () => {
    it('should return true if completed', async () => {
      (prisma.userProfile.findFirst as any).mockResolvedValue({
        onboardingCompleted: true,
      });
      const result = await isUserOnboardingCompleted('user-1');
      expect(result).toBe(true);
    });

    it('should return false if not completed', async () => {
      (prisma.userProfile.findFirst as any).mockResolvedValue({
        onboardingCompleted: false,
      });
      const result = await isUserOnboardingCompleted('user-1');
      expect(result).toBe(false);
    });

    it('should return false if profile not found', async () => {
      (prisma.userProfile.findFirst as any).mockResolvedValue(null);
      const result = await isUserOnboardingCompleted('user-1');
      expect(result).toBe(false);
    });
  });

  describe('getUserContext', () => {
    it('should aggregate user role, target language, and profile', async () => {
      (prisma.userRole.findFirst as any).mockResolvedValue({ role: 'admin' });
      (prisma.userTargetLanguage.findFirst as any).mockResolvedValue({
        language: 'en',
      });
      (prisma.userProfile.findFirst as any).mockResolvedValue({
        uiLanguage: 'es',
      });

      const result = await getUserContext('user-1');

      expect(result).toEqual({
        userRole: { role: 'admin' },
        userTargetLanguage: { language: 'en' },
        userProfile: { uiLanguage: 'es' },
      });
      expect(prisma.userRole.findFirst).toHaveBeenCalledWith({
        where: { userId: 'user-1' },
        include: { role: true },
      });
      expect(prisma.userTargetLanguage.findFirst).toHaveBeenCalledWith({
        where: { userId: 'user-1' },
        include: { language: true },
      });
      expect(prisma.userProfile.findFirst).toHaveBeenCalledWith({
        where: { userId: 'user-1' },
        include: { uiLanguage: true },
      });
    });
  });
});
