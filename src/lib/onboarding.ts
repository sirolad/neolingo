import prisma from '@lib/prisma';

export function getOnboardingSeen(): boolean {
  try {
    return localStorage.getItem('onboardingSeen') === 'true';
  } catch {
    return false;
  }
}

export function setOnboardingSeen(value = true): void {
  try {
    localStorage.setItem('onboardingSeen', value ? 'true' : 'false');
  } catch {
    // ignore localStorage errors (e.g., SSR or privacy settings)
  }
}

export async function completeOnboardingForUser(
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

export async function isOnboardingCompleted(userId: string): Promise<boolean> {
  const profile = await prisma.userProfile.findFirst({
    where: { userId },
    select: { onboardingCompleted: true },
  });
  return profile?.onboardingCompleted ?? false;
}
