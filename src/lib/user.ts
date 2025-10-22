import type { User } from '@supabase/supabase-js';
import type { AppUser } from '@/types';

export function normalizeUser(u: User | null): AppUser | null {
  if (!u) return null;

  const meta = u.user_metadata ?? {};
  const appMeta = u.app_metadata ?? {};

  return {
    id: u.id,
    email: u.email ?? null,
    displayName: (meta && (meta.name || meta.full_name)) ?? null,
    avatar: (meta && (meta.avatar || meta.picture)) ?? null,
    provider: appMeta?.provider ?? null,
    createdAt: (u as User).created_at ?? null,
    raw: u,
    name: meta.name ?? null,
  };
}
