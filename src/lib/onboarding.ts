import {
  setCompleteOnboardingForUser,
  isUserOnboardingCompleted,
} from '@/actions/auth';

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
  await setCompleteOnboardingForUser(userId, languageId);
}

export async function isOnboardingCompleted(userId: string): Promise<boolean> {
  return await isUserOnboardingCompleted(userId);
}
