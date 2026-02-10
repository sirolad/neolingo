'use client';

import React, { useEffect, useState } from 'react';
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
import { signInSchema, type SignInFormData } from '@/lib/schemas/auth';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { getCallbackUrl } from '@/lib/urls';
import { SocialProvider } from '@/types';
import { SocialLoginButtons } from '@/components/auth/SocialLoginButtons';

export default function SignInPage() {
  const router = useRouter();
  const { login, socialLogin } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [urlParameter, setUrlParameter] = useState<string | null>(null);

  // Check for auth callback errors
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.toString() !== '') {
      const redirectpage = urlParams.get('redirectTo');
      setUrlParameter(redirectpage);
    }
    const error = urlParams.get('error');

    if (error === 'auth_callback_failed') {
      toast.error('Authentication failed. Please try again.');
      // Clean up the URL
      router.replace('/signin');
    }
  }, [router]);

  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = async (data: SignInFormData) => {
    setLoading(true);

    try {
      const result = await login(data.email, data.password);

      if (!result) {
        toast.error('Login failed. Please check your credentials.');
        return;
      }

      if (urlParameter) {
        router.push(urlParameter);
        return;
      }
      router.push('/home');
    } catch (err) {
      console.error(err);
      toast.error('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: SocialProvider) => {
    try {
      const redirectTo = getCallbackUrl();
      console.log('🚀 Starting social login with:', { provider, redirectTo });
      const result = await socialLogin(provider, redirectTo);

      if (result) {
        router.push('/home');
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
                Sign into Your Account
              </h1>
              <p className="subtitle-small text-muted-foreground">
                Sign in with
              </p>
            </div>

            {/* Social Login Buttons */}
            <SocialLoginButtons
              onLogin={handleSocialLogin}
              actionText="Sign In"
            />

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-1 h-px bg-border/40"></div>
              <span className="px-4 text-caption bg-card">
                or sign in with email
              </span>
              <div className="flex-1 h-px bg-border/40"></div>
            </div>

            {/* Sign In Form */}
            <Form {...form}>
              <form
                id="signin-form"
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-2"
              >
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

                {/* Remember Me and Forgot Password */}
                <div className="flex items-center justify-between pt-2">
                  <label className="flex items-center space-x-2">
                    <Checkbox
                      checked={rememberMe}
                      onClick={() => setRememberMe(!rememberMe)}
                      className="w-4 h-4 text-primary border-input rounded focus:ring-ring"
                    />
                    <span className="text-caption text-muted-foreground">
                      Remember Me
                    </span>
                  </label>
                  <a
                    href="/reset-password"
                    className="text-caption text-muted-foreground hover:text-primary transition-colors"
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
            className="btn-big rounded-full shadow-[0px_3px_32px_-1px_rgba(0,0,0,0.15)] mt-6 text-button text-base mx-auto w-full max-w-md text-primary-foreground"
          >
            {loading ? 'Signing In...' : 'Log in'}
          </Button>

          {/* Sign Up Link */}
          <div className="text-center mt-2 mx-auto w-full max-w-md">
            <p className="text-caption text-muted-foreground">
              Don&apos;t have an account?{' '}
              <a
                href="/signup"
                className="text-primary text-label hover:opacity-70 transition-opacity"
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
