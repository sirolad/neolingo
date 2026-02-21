'use server';

import createClient from '@/lib/supabase/server';
import * as Sentry from '@sentry/nextjs';
import prisma from '@/lib/prisma';
import { getBaseUrl } from '@/lib/urls';

/**
 * Send a password reset email to the user
 * @param email - User's email address
 * @returns Success boolean
 */
export async function resetPassword(
  email: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = await createClient();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL || getBaseUrl()}/reset-password#step=newPassword`,
    });

    if (error) {
      console.error('Supabase resetPassword error:', error);
      Sentry.captureException(error, {
        tags: { operation: 'resetPassword' },
        extra: { email },
      });
      return { success: false, error: error.message };
    }

    console.log('Password reset email sent to:', email);
    return { success: true };
  } catch (err) {
    console.error('resetPassword unexpected error:', err);
    Sentry.captureException(err, {
      tags: { operation: 'resetPassword' },
    });
    return { success: false, error: 'An unexpected error occurred' };
  }
}

export async function setCompleteOnboardingForUser(
  userId: string
): Promise<void> {
  await prisma.$transaction(async tx => {
    // 1. Ensure Profile Exists & Mark Onboarding Complete
    const uiLanguages = await tx.uILanguage.findMany({
      where: { is_supported: true },
      take: 1,
    });
    const languageId = uiLanguages.length > 0 ? uiLanguages[0].id : 1;
    await tx.userProfile.upsert({
      where: { userId },
      update: { onboardingCompleted: true },
      create: {
        userId,
        uiLanguageId: languageId,
        onboardingCompleted: true,
      },
    });

    // 2. Assign Default Role if missing
    const existingRole = await tx.userRole.findFirst({
      where: { userId },
    });

    if (!existingRole) {
      const userRoleDef = await tx.role.findUnique({
        where: { name: 'EXPLORER' },
      });

      if (userRoleDef) {
        await tx.userRole.create({
          data: {
            userId,
            roleId: userRoleDef.id,
          },
        });
      }
    }
  });
}

export async function isUserOnboardingCompleted(
  userId: string
): Promise<boolean> {
  const profile = await prisma.userProfile.findFirst({
    where: { userId },
    select: { onboardingCompleted: true },
  });
  return profile?.onboardingCompleted ?? false;
}

export async function getUserContext(userId: string) {
  const [userRole, userTargetLanguage, userProfile] = await Promise.all([
    prisma.userRole.findFirst({
      where: { userId },
      include: { role: true },
    }),
    prisma.userTargetLanguage.findFirst({
      where: { userId },
      include: { language: true },
    }),
    prisma.userProfile.findFirst({
      where: { userId },
      include: { uiLanguage: true },
    }),
  ]);

  return {
    userRole,
    userTargetLanguage,
    userProfile,
  };
}

export async function getTotalUserCount(): Promise<{
  success: boolean;
  count: number;
}> {
  try {
    const count = await prisma.userProfile.count();
    return { success: true, count };
  } catch (err) {
    console.error('Failed to get total user count:', err);
    return { success: false, count: 0 };
  }
}
