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

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  // Derive a normalized app-level user for UI components
  const appUser = useMemo(() => normalizeUser(user), [user]);
  const router = useRouter();

  const supabase = useMemo(() => createClient(), []);

  const checkAuth = useCallback(async () => {
    try {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        // AuthSessionMissingError is normal when no session exists
        if (error.message?.includes('Auth session missing')) {
          console.log('No active session found - user not authenticated');
        } else {
          console.warn('Supabase getUser error', error);
        }
        setUser(null);
      } else {
        setUser(data?.user ?? null);
      }
    } catch (err) {
      console.warn('checkAuth unexpected error', err);
      setUser(null);
    }
    setIsLoading(false);
  }, [supabase]);

  useEffect(() => {
    // Initial auth check
    checkAuth();

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('🔄 Auth state changed:', event, session?.user?.email);

      if (event === 'SIGNED_IN') {
        setUser(session?.user ?? null);
        setIsLoading(false);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
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

  const resetPassword = async (email: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password#step=newPassword`,
      });
      if (error) {
        console.warn('Supabase resetPassword error', error);
        Sentry.captureException(error, {
          tags: { operation: 'resetPassword' },
        });
        return false;
      }

      console.log('Password reset email sent to', email, data);
      return true;
    } catch (err) {
      console.warn('resetPassword unexpected error', err);
      return false;
    }
  };

  const updatePassword = async (newPassword: string): Promise<User | null> => {
    try {
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      if (error) {
        console.warn('1 Supabase updatePassword error', error);
        Sentry.captureException(error, {
          tags: { operation: 'updatePassword' },
        });
        return null;
      }
      const updatedUser = data.user ?? null;
      setUser(updatedUser);
      return updatedUser;
    } catch (err) {
      console.warn('updatePassword unexpected error', err);
      return null;
    }
  };

  const signup = async (
    email: string,
    password: string,
    name?: string,
    redirectTo?: string
  ): Promise<User | null> => {
    try {
      const signUpPayload: {
        email: string;
        password: string;
        options?: { emailRedirectTo?: string };
      } = { email, password };
      if (redirectTo) {
        signUpPayload.options = { emailRedirectTo: redirectTo };
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

  const value: AuthContextType = {
    user,
    appUser,
    isLoading,
    isAuthenticated: !!appUser,
    login,
    signup,
    logout,
    checkAuth,
    socialLogin,
    resetPassword,
    updatePassword,
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
