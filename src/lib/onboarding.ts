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
