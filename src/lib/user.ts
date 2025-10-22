import type { User } from '@supabase/supabase-js'

export interface AppUser {
  id: string
  email?: string | null
  displayName?: string | null
  avatar?: string | null
  provider?: string | null
  createdAt?: string | null
  // keep raw for advanced uses when needed
  raw?: User
}

export function normalizeUser(u: User | null): AppUser | null {
  if (!u) return null

  const meta = u.user_metadata ?? {}
  const appMeta = u.app_metadata ?? {}

  return {
    id: u.id,
    email: u.email ?? null,
    displayName: (meta && (meta.name || meta.full_name)) ?? null,
    avatar: (meta && (meta.avatar || meta.picture)) ?? null,
    provider: appMeta?.provider ?? null,
    createdAt: (u as User).created_at ?? null,
    raw: u,
  }
}
