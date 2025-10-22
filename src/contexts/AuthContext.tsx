'use client'

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react'
import { useRouter } from 'next/navigation'
import type { User } from '@supabase/supabase-js'
import createClient from '@/lib/supabase/client'
import { normalizeUser } from '@/lib/user'
import type { AppUser, AuthContextType, SocialProvider } from '@/types'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  // Derive a normalized app-level user for UI components
  const appUser = useMemo(() => normalizeUser(user), [user])
  const router = useRouter()

  const supabase = useMemo(() => createClient(), [])

  const checkAuth = useCallback(async () => {
    try {
      const { data, error } = await supabase.auth.getUser()
      if (error) {
        console.warn('Supabase getUser error', error)
        setUser(null)
      } else {
        setUser(data?.user ?? null)
      }
    } catch (err) {
      console.warn('checkAuth unexpected error', err)
      setUser(null)
    }
    setIsLoading(false)
  }, [supabase])

  useEffect(() => {
    // Initial auth check
    checkAuth()
  }, [checkAuth])

  const login = async (
    email: string,
    password: string,
  ): Promise<User | null> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) {
        console.warn('Supabase signIn error', error)
        setUser(null)
        return null
      }
      const signedUser = data.user ?? null
      setUser(signedUser)
      return signedUser
    } catch (err) {
      console.warn('login unexpected error', err)
      setUser(null)
      return null
    }
  }

  const signup = async (
    email: string,
    password: string,
    name?: string,
    redirectTo?: string,
  ): Promise<User | null> => {
    try {
      const signUpPayload: {
        email: string
        password: string
        options?: { emailRedirectTo?: string }
      } = { email, password }
      if (redirectTo) {
        signUpPayload.options = { emailRedirectTo: redirectTo }
      }

      const { data, error } = await supabase.auth.signUp(signUpPayload)
      if (error) {
        console.warn('Supabase signUp error', error)
        setUser(null)
        return null
      }
      const createdUser = data.user ?? null
      setUser(createdUser)
      return createdUser
    } catch (err) {
      console.warn('signup unexpected error', err)
      setUser(null)
      return null
    }
  }

  const socialLogin = async (
    provider: SocialProvider,
    redirectTo?: string,
  ): Promise<User | null> => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: redirectTo ? { redirectTo } : undefined,
      })

      if (error) {
        console.warn('Supabase social login error', error)
        return null
      }

      // If Supabase returns a user (rare for OAuth flows that redirect), set it
      const returnedUser = (data as { user?: User | null })?.user ?? null
      if (returnedUser) {
        setUser(returnedUser)
        return returnedUser
      }

      // OAuth usually redirects the browser; return null to indicate redirect in progress
      return null
    } catch (err) {
      console.warn('socialLogin unexpected error', err)
      return null
    }
  }

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) console.warn('Supabase signOut error', error)
    } catch (err) {
      console.warn('logout unexpected error', err)
    }

    setUser(null)
    router.push('/signin')
  }

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
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default AuthContext
