'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { mockAuth, type MockUser } from '@/lib/mockAuth'

interface AuthContextType {
  user: MockUser | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<MockUser | null>
  signup: (email: string, password: string, name?: string) => Promise<MockUser>
  logout: () => void
  checkAuth: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const checkAuth = () => {
    const currentUser = mockAuth.getCurrentUser()
    setUser(currentUser)
    setIsLoading(false)
  }

  useEffect(() => {
    // Initial auth check
    checkAuth()
  }, [])

  const login = async (email: string, password: string): Promise<MockUser | null> => {
    const loggedInUser = await mockAuth.login(email, password)
    if (loggedInUser) {
      setUser(loggedInUser)
    }
    return loggedInUser
  }

  const signup = async (email: string, password: string, name?: string): Promise<MockUser> => {
    const newUser = await mockAuth.signup(email, password, name)
    setUser(newUser)
    return newUser
  }

  const logout = () => {
    mockAuth.logout()
    setUser(null)
    router.push('/signin')
  }

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
    checkAuth
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default AuthContext