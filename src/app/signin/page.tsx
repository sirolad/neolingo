'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Mail, Eye, EyeOff, Lock } from 'lucide-react'
import { mockAuth, mockSocialLogin } from '@/lib/mockAuth'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { signInSchema, type SignInFormData } from '@/lib/schemas/auth'

export default function SignInPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [apiError, setApiError] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleSubmit = async (data: SignInFormData) => {
    setLoading(true)
    setApiError('')
    
    try {
      const user = await mockAuth.login(data.email, data.password)
      
      if (user) {
        // Success - redirect to home
        router.push('/home')
      } else {
        // Invalid credentials
        setApiError('Invalid email or password')
      }
    } catch {
      setApiError('Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSocialLogin = async (provider: 'google' | 'apple') => {
    try {
      const user = await mockSocialLogin[provider]()
      if (user) {
        router.push('/home')
      }
    } catch {
      setApiError('Social login failed. Please try again.')
    }
  }

  return (
    <div className="h-screen bg-secondary flex flex-col overflow-hidden">
      {/* Main Content */}
      <div className="flex-1 flex flex-col px-6 py-6 mb-2">
        <div className="flex-1 flex flex-col justify-center">

          {/* Content Card */}
          <div className="bg-card rounded-3xl border border-border p-4 mx-auto w-full max-w-md">

            {/* Header */}
            <div className="text-center mb-5">
              <h1 className="text-[26px] font-medium leading-[34px] text-foreground font-[Parkinsans] mb-1">
                Sign into Your Account
              </h1>
              <p className="text-[14px] font-normal leading-[14px] text-muted-foreground font-[Metropolis]">
                Sign in with
              </p>
            </div>

            {/* Social Login Buttons */}
            <div className="space-y-3 mb-6">
              <Button
                type="button"
                variant="social"
                size="lg"
                fullWidth
                onClick={() => handleSocialLogin("google")}
                className="btn-big rounded-full font-[Parkinsans] text-[14px] font-medium border-border"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Sign In with Google
              </Button>
              <Button
                type="button"
                variant="social"
                size="lg"
                fullWidth
                onClick={() => handleSocialLogin("apple")}
                className="btn-big rounded-full font-[Parkinsans] text-[14px] font-medium border-border"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                Sign In with Apple
              </Button>
            </div>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-1 h-px bg-border/40"></div>
              <span className="px-4 text-[12px] font-normal text-muted-foreground font-[Metropolis] bg-card">
                or sign in with email
              </span>
              <div className="flex-1 h-px bg-border/40"></div>
            </div>

            {/* API Error */}
            {apiError && (
              <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg text-sm font-[Metropolis] mb-4">
                {apiError}
              </div>
            )}

            {/* Sign In Form */}
            <Form {...form}>
              <form id="signin-form" onSubmit={form.handleSubmit(handleSubmit)} className="space-y-2">
                {/* Email Input */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-medium text-primary font-[Parkinsans]">
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type="email"
                            placeholder="Enter Email Address"
                            disabled={loading}
                            className="h-[52px] pr-12 border-border rounded-xl font-[Metropolis] text-[14px] placeholder:text-muted-foreground focus:border-primary"
                            {...field}
                          />
                          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                            <Mail className="w-5 h-5 text-muted-foreground" />
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage className="text-[12px] font-[Metropolis]" />
                    </FormItem>
                  )}
                />

                {/* Password Input */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-medium text-primary font-[Parkinsans]">
                        Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter Password"
                            disabled={loading}
                            className="h-[52px] pr-20 border-border rounded-xl font-[Metropolis] text-[14px] placeholder:text-muted-foreground focus:border-primary"
                            {...field}
                          />
                          <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
                            <Lock className="w-4 h-4 text-muted-foreground" />
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors h-5 w-5 p-0"
                          >
                            {showPassword ? (
                              <Eye className="w-5 h-5" />
                            ) : (
                              <EyeOff className="w-5 h-5" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-[12px] font-[Metropolis]" />
                    </FormItem>
                  )}
                />

                {/* Remember Me and Forgot Password */}
                <div className="flex items-center justify-between pt-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 text-primary border-input rounded focus:ring-ring"
                    />
                    <span className="text-xs text-muted-foreground font-[Metropolis]">Remember Me</span>
                  </label>
                  <a 
                    href="/reset-password" 
                    className="text-xs text-muted-foreground hover:text-primary transition-colors font-[Metropolis]"
                  >
                    Forget Password?
                  </a>
                </div>

              </form>
            </Form>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            form="signin-form"
            loading={loading}
            fullWidth
            className="btn-big rounded-full shadow-[0px_3px_32px_-1px_rgba(0,0,0,0.15)] mt-6 font-[Parkinsans] text-[16px] font-semibold mx-auto w-full max-w-md"
          >
            {loading ? 'Signing In...' : 'Log in'}
          </Button>

          {/* Sign Up Link */}
          <div className="text-center mt-2 mx-auto w-full max-w-md">
            <p className="text-xs text-muted-foreground font-[Metropolis]">
              Don&apos;t have an account?{" "}
              <a
                href="/signup"
                className="text-primary font-semibold hover:opacity-70 transition-opacity font-[Parkinsans]"
              >
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
