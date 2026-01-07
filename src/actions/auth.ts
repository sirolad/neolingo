'use server';

import createClient from '@/lib/supabase/server';
import * as Sentry from '@sentry/nextjs';
import prisma from '@/lib/prisma';

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
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/reset-password#step=newPassword`,
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
  userId: string,
  languageId: number
): Promise<void> {
  await prisma.userProfile.upsert({
    where: { userId },
    update: { onboardingCompleted: true },
    create: {
      userId,
      languageId,
      onboardingCompleted: true,
    },
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
