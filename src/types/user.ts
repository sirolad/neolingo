import type { User } from '@supabase/supabase-js';
import type { BaseEntity } from './common';

// Main application user interface
export interface AppUser extends BaseEntity {
  email?: string | null;
  displayName?: string | null;
  avatar?: string | null;
  provider?: string | null;
  // keep raw for advanced uses when needed
  raw?: User;
}

// Mock user interface for development
export interface MockUser {
  id: string;
  email: string;
  password: string;
  displayName: string;
  avatar?: string;
  provider: 'email' | 'google' | 'apple';
}

// User profile interface
export interface UserProfile {
  id: string;
  displayName: string;
  avatar?: string;
  bio?: string;
  language?: string;
  level?: 'beginner' | 'intermediate' | 'advanced';
}

// User preferences
export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  notifications: {
    email: boolean;
    push: boolean;
    weekly: boolean;
  };
}
