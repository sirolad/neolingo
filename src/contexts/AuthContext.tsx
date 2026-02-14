'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import { useRouter } from 'next/navigation';
import type { User } from '@supabase/supabase-js';
import createClient from '@/lib/supabase/client';
import { normalizeUser } from '@/lib/user';
import type { AuthContextType, SocialProvider } from '@/types';
import * as Sentry from '@sentry/nextjs';
import { NeoCommunity } from '@/types/neocommunity';
import {
  hasPermission,
  hasAnyPermission,
  hasAllPermissions,
  type Permission,
  type Role,
} from '@/lib/auth/permissions';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [roleName, setRoleName] = useState<Role | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const userRole = useMemo(() => roleName || 'EXPLORER', [roleName]);
  const [languageId, setLanguageId] = useState<number | null>(null);
  const userLanguageId = useMemo(() => languageId, [languageId]);
  const [userNeoCommunityId, setUserNeoCommunityId] = useState<number | null>(
    null
  );
  const [userNeoCommunity, setUserNeoCommunity] = useState<NeoCommunity | null>(
    null
  );
  // Derive a normalized app-level user for UI components
  const appUser = useMemo(() => normalizeUser(user), [user]);
  const router = useRouter();

  const supabase = useMemo(() => createClient(), []);

  const checkAuth = useCallback(async () => {
    try {
      // Fetch user data and role in a single call
      const res = await fetch('/api/auth/me');

      if (!res.ok) {
        setUser(null);
        setRoleName(null);
        setLanguageId(null);
        setUserNeoCommunityId(null);
        setUserNeoCommunity(null);
      } else {
        const data = await res.json();

        // Set all state atomically to avoid race conditions
        setRoleName(data.role || null);
        setLanguageId(data.languageId || null);
        setUserNeoCommunityId(data.neoCommunityId);
        setUserNeoCommunity(data.neoCommunity || null);
        setUser(data.user ?? null);
      }
    } catch (err) {
      console.warn('checkAuth unexpected error', err);
      setUser(null);
      setRoleName(null);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Initial auth check
    checkAuth();

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      // console.log('🔄 Auth state changed:', event, session?.user?.email);

      if (event === 'SIGNED_IN') {
        // Fetch fresh user data from database (not cookie)
        const res = await fetch('/api/auth/me');

        if (res.ok) {
          const data = await res.json();

          // Set all state atomically
          setRoleName(data.role || null);
          setLanguageId(data.languageId || null);
          setUserNeoCommunityId(data.neoCommunityId);
          setUserNeoCommunity(data.neoCommunity || null);
          setUser(data.user ?? null);
        } else {
          setUser(session?.user ?? null);
        }
        setIsLoading(false);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setRoleName(null);
        setLanguageId(null);
        setUserNeoCommunityId(null);
        setUserNeoCommunity(null);
        setIsLoading(false);
      } else if (event === 'TOKEN_REFRESHED') {
        setUser(session?.user ?? null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [checkAuth, supabase.auth]);

  const login = async (
    email: string,
    password: string
  ): Promise<User | null> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        console.warn('Supabase signIn error', error);
        Sentry.captureException(error, {
          tags: { operation: 'signIn' },
          extra: { email },
        });
        setUser(null);
        return null;
      }
      const signedUser = data.user ?? null;
      setUser(signedUser);
      return signedUser;
    } catch (err) {
      console.warn('login unexpected error', err);
      setUser(null);
      return null;
    }
  };

  const signup = async (
    email: string,
    password: string,
    name: string,
    redirectTo?: string
  ): Promise<User | null> => {
    try {
      const signUpPayload: {
        email: string;
        password: string;
        options: {
          emailRedirectTo?: string;
          data: { name: string; display_name: string };
        };
      } = { email, password, options: { data: { name, display_name: name } } };
      if (redirectTo) {
        signUpPayload.options = {
          emailRedirectTo: redirectTo,
          data: { name, display_name: name },
        };
      }

      const { data, error } = await supabase.auth.signUp(signUpPayload);
      if (error) {
        console.warn('Supabase signUp error', error);
        Sentry.captureException(error, {
          tags: { operation: 'signUp' },
          extra: { email },
        });
        setUser(null);
        return null;
      }
      const createdUser = data.user ?? null;
      setUser(createdUser);
      return createdUser;
    } catch (err) {
      console.warn('signup unexpected error', err);
      setUser(null);
      return null;
    }
  };

  const socialLogin = async (
    provider: SocialProvider,
    redirectTo?: string
  ): Promise<User | null> => {
    try {
      console.log('🔐 Supabase OAuth request:', { provider, redirectTo });
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: redirectTo ? { redirectTo } : undefined,
      });

      if (error) {
        console.warn('Supabase social login error', error);
        Sentry.captureException(error, {
          tags: { operation: 'socialLogin', provider },
          extra: { redirectTo },
        });
        return null;
      }

      // If Supabase returns a user (rare for OAuth flows that redirect), set it
      const returnedUser = (data as { user?: User | null })?.user ?? null;
      if (returnedUser) {
        setUser(returnedUser);
        return returnedUser;
      }

      // OAuth usually redirects the browser; return null to indicate redirect in progress
      return null;
    } catch (err) {
      console.warn('socialLogin unexpected error', err);
      return null;
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) console.warn('Supabase signOut error', error);
    } catch (err) {
      console.warn('logout unexpected error', err);
    }

    setUser(null);
    router.push('/signin');
  };

  // Permission helper methods
  const can = useCallback(
    (permission: Permission): boolean => {
      return hasPermission(userRole as Role, permission);
    },
    [userRole]
  );

  const canAny = useCallback(
    (permissions: Permission[]): boolean => {
      return hasAnyPermission(userRole as Role, permissions);
    },
    [userRole]
  );

  const canAll = useCallback(
    (permissions: Permission[]): boolean => {
      return hasAllPermissions(userRole as Role, permissions);
    },
    [userRole]
  );

  const value: AuthContextType = {
    user,
    appUser,
    isLoading,
    isAuthenticated: !!appUser,
    userRole,
    userLanguageId,
    userNeoCommunityId,
    userNeoCommunity,
    login,
    signup,
    logout,
    checkAuth,
    socialLogin,
    // Permission helpers
    can,
    canAny,
    canAll,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
