// Form data types (inferred from Zod schemas);

// Authentication context type
export interface AuthContextType {
  // Supabase User when authenticated, or null
  user: import('@supabase/supabase-js').User | null;
  // Normalized app-specific user shape for UI consumption
  appUser: AppUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  userRole: string;
  // Methods return Supabase User on success (or null)
  login: (
    email: string,
    password: string
  ) => Promise<import('@supabase/supabase-js').User | null>;
  // redirectTo will be forwarded to Supabase's email redirect option (used for verification flows)
  signup: (
    email: string,
    password: string,
    name?: string,
    redirectTo?: string
  ) => Promise<import('@supabase/supabase-js').User | null>;
  logout: () => void;
  checkAuth: () => void;
  socialLogin: (
    provider: 'google' | 'apple',
    redirectTo?: string
  ) => Promise<import('@supabase/supabase-js').User | null>;
}

// Form data types (inferred from Zod schemas)
export type SignUpFormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type SignInFormData = {
  email: string;
  password: string;
};

export type ResetPasswordFormData = {
  email: string;
};

export type NewPasswordFormData = {
  password: string;
  confirmPassword: string;
};

// Authentication state types
export type AuthState = 'loading' | 'authenticated' | 'unauthenticated';

// Social login providers
export type SocialProvider = 'google' | 'apple';

// Authentication error types
export interface AuthError {
  code: string;
  message: string;
  details?: string;
}

// Import AppUser from user types
import type { AppUser } from './user';
