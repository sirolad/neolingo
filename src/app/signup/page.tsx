'use client';

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Mail, Eye, EyeOff, Lock } from 'lucide-react'
import { mockAuth, mockSocialLogin } from '@/lib/mockAuth'

export default function SignUpPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setLoading(true)
    
    try {
      const user = await mockAuth.signup(formData.email, formData.password)
      
      if (user) {
        // Success - redirect to email verification
        router.push('/email-verification/1')
      }
    } catch (error) {
      setErrors({ email: 'Registration failed. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  const handleSocialLogin = async (provider: 'google' | 'apple') => {
    try {
      const user = await mockSocialLogin[provider]()
      if (user) {
        router.push('/email-verification/1')
      }
    } catch (error) {
      setErrors({ email: 'Social login failed. Please try again.' })
    }
  }

  return (
    <div className="h-screen bg-[#F4F4F4] flex flex-col overflow-hidden">
      {/* Main Content */}
      <div className="flex-1 flex flex-col px-6 py-6">
        <div className="flex-1 flex flex-col justify-center">
          
          {/* Content Card */}
          <div className="bg-white rounded-3xl border border-[#EFEFEF] p-6 mx-auto w-full max-w-md">
            
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-[28px] font-medium leading-[34px] text-[#292929] font-[Parkinsans] mb-3">
                Join the Community
              </h1>
              <p className="text-[14px] font-normal leading-[14px] text-[#656565] font-[Metropolis]">
                Sign up with
              </p>
            </div>

            {/* Social Login Buttons */}
            <div className="space-y-3 mb-6">
              <button
                onClick={() => handleSocialLogin("google")}
                className="w-full h-[54px] flex items-center justify-center bg-white border border-[rgba(17,17,17,0.15)] rounded-full font-[Parkinsans] text-[14px] font-medium text-[#111111] hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Sign Up with Google
              </button>
              <button
                onClick={() => handleSocialLogin("apple")}
                className="w-full h-[54px] flex items-center justify-center bg-white border border-[rgba(17,17,17,0.15)] rounded-full font-[Parkinsans] text-[14px] font-medium text-[#111111] hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                Sign Up with Apple
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-1 h-px bg-[rgba(17,17,17,0.1)]"></div>
              <span className="px-4 text-[12px] font-normal text-[#656565] font-[Metropolis] bg-white">
                or sign up with email
              </span>
              <div className="flex-1 h-px bg-[rgba(17,17,17,0.1)]"></div>
            </div>

            {/* Sign Up Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-[14px] font-medium text-[#111111] font-[Parkinsans]">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter Email Address"
                    disabled={loading}
                    className="w-full h-[52px] px-4 pr-12 border border-[rgba(17,17,17,0.15)] rounded-xl bg-white font-[Metropolis] text-[14px] placeholder:text-[#656565] focus:outline-none focus:border-[#111111] transition-colors"
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <Mail className="w-5 h-5 text-[#656565]" />
                  </div>
                </div>
                {errors.email && (
                  <p className="text-[12px] text-red-500 font-[Metropolis]">{errors.email}</p>
                )}
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="text-[14px] font-medium text-[#111111] font-[Parkinsans]">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter Password"
                    disabled={loading}
                    className="w-full h-[52px] px-4 pr-20 border border-[rgba(17,17,17,0.15)] rounded-xl bg-white font-[Metropolis] text-[14px] placeholder:text-[#656565] focus:outline-none focus:border-[#111111] transition-colors"
                  />
                  <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
                    <Lock className="w-4 h-4 text-[#656565]" />
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#656565] hover:text-[#111111] transition-colors"
                  >
                    {showPassword ? (
                      <Eye className="w-5 h-5" />
                    ) : (
                      <EyeOff className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-[12px] text-red-500 font-[Metropolis]">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password Input */}
              <div className="space-y-2">
                <label className="text-[14px] font-medium text-[#111111] font-[Parkinsans]">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Re-enter Password"
                    disabled={loading}
                    className="w-full h-[52px] px-4 pr-20 border border-[rgba(17,17,17,0.15)] rounded-xl bg-white font-[Metropolis] text-[14px] placeholder:text-[#656565] focus:outline-none focus:border-[#111111] transition-colors"
                  />
                  <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
                    <Lock className="w-4 h-4 text-[#656565]" />
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#656565] hover:text-[#111111] transition-colors"
                  >
                    {showConfirmPassword ? (
                      <Eye className="w-5 h-5" />
                    ) : (
                      <EyeOff className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-[12px] text-red-500 font-[Metropolis]">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-[58px] flex items-center justify-center bg-[#111111] rounded-full shadow-[0px_3px_32px_-1px_rgba(0,0,0,0.15)] disabled:opacity-70 disabled:cursor-not-allowed transition-opacity mt-6"
              >
                <span className="text-[16px] font-semibold leading-[22px] text-white font-[Parkinsans]">
                  {loading ? 'Creating Account...' : 'Get Started'}
                </span>
              </button>
            </form>

            {/* Sign In Link */}
            <div className="text-center mt-6">
              <p className="text-[14px] text-[#656565] font-[Metropolis]">
                Have an account?{" "}
                <a
                  href="/signin"
                  className="text-[#111111] font-medium hover:opacity-70 transition-opacity font-[Parkinsans]"
                >
                  Sign In
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
