'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { signUpSchema, type SignUpFormData } from '@/lib/schemas/auth';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { getCallbackUrl } from '@/lib/urls';
import { SocialLoginButtons } from '@/components/auth/SocialLoginButtons';

export default function SignUpPage() {
  const { signup, socialLogin } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
      confirmPassword: '',
    },
  });

  const handleSubmit = async (data: SignUpFormData) => {
    setLoading(true);

    try {
      const redirectTo = getCallbackUrl();
      const created = await signup(
        data.email,
        data.password,
        data.name,
        redirectTo
      );

      if (!created) {
        // signup failed or returned null
        toast.error('Registration failed. Please try again.');
        return;
      }

      // On success, inform the user and navigate to email verification
      toast.success(
        'Sign up successful!, please check your email to verify your account.'
      );
      router.push('/email-verification/1');
    } catch {
      console.error('Registration failed. Please try again.');
      toast.error('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'apple') => {
    try {
      const redirectTo = getCallbackUrl();
      console.log('🚀 Starting social login with:', { provider, redirectTo });
      const result = await socialLogin(provider, redirectTo);

      if (result) {
        router.push('/neo-language-setup');
      }
    } catch (error) {
      console.error(error);
      toast.error('Social login failed. Please try again.');
    }
  };

  return (
    <div className="h-screen bg-secondary flex flex-col overflow-hidden">
      {/* Main Content */}
      <div className="flex-1 flex flex-col px-6 py-6 mb-2">
        <div className="flex-1 flex flex-col justify-center">
          {/* Content Card */}
          <div className="bg-card rounded-3xl border border-border p-4 mx-auto w-full max-w-md">
            {/* Header */}
            <div className="text-center mb-5">
              <h1 className="auth-title text-foreground mb-1">
                Join the Community
              </h1>
              <p className="subtitle-small text-muted-foreground">
                Sign up with
              </p>
            </div>

            {/* Social Login Buttons */}
            <SocialLoginButtons
              onLogin={handleSocialLogin}
              actionText="Sign Up"
            />

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-1 h-px bg-border/40"></div>
              <span className="px-4 text-caption text-muted-foreground bg-card">
                or sign up with email
              </span>
              <div className="flex-1 h-px bg-border/40"></div>
            </div>

            {/* Sign Up Form */}
            <Form {...form}>
              <form
                id="signup-form"
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-2"
              >
                {/* Name Input */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-label text-primary">
                        Username
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter Username"
                          disabled={loading}
                          className="h-[52px] border-border rounded-xl body-small placeholder:text-muted-foreground focus:border-primary"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-caption" />
                    </FormItem>
                  )}
                />
                {/* Email Input */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-label text-primary">
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type="email"
                            placeholder="Enter Email Address"
                            disabled={loading}
                            className="h-[52px] pr-12 border-border rounded-xl body-small placeholder:text-muted-foreground focus:border-primary"
                            {...field}
                          />
                          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                            <Mail className="w-5 h-5 text-muted-foreground" />
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage className="text-caption" />
                    </FormItem>
                  )}
                />

                {/* Password Input */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-label text-primary">
                        Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter Password"
                            disabled={loading}
                            className="h-[52px] pr-20 border-border rounded-xl body-small placeholder:text-muted-foreground focus:border-primary"
                            {...field}
                          />
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
                      <FormMessage className="text-caption" />
                    </FormItem>
                  )}
                />

                {/* Confirm Password Input */}
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-label text-primary">
                        Confirm Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="Re-enter Password"
                            disabled={loading}
                            className="h-[52px] pr-20 border-border rounded-xl body-small placeholder:text-muted-foreground focus:border-primary"
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors h-5 w-5 p-0"
                          >
                            {showConfirmPassword ? (
                              <Eye className="w-5 h-5" />
                            ) : (
                              <EyeOff className="w-5 h-5" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-caption" />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            form="signup-form"
            loading={loading}
            fullWidth
            className="btn-big rounded-full shadow-[0px_3px_32px_-1px_rgba(0,0,0,0.15)] mt-6 text-button text-base mx-auto w-full max-w-md text-primary-foreground"
          >
            {loading ? 'Creating Account...' : 'Set Up Your Profile'}
          </Button>

          {/* Sign In Link */}
          <div className="text-center mt-2 mx-auto w-full max-w-md">
            <p className="text-caption text-muted-foreground">
              Have an account?{' '}
              <a
                href="/signin"
                className="text-primary text-label hover:opacity-70 transition-opacity"
              >
                Sign In
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
