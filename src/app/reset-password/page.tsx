"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, Eye, EyeOff, Check } from "lucide-react";
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState<"email" | "newPassword" | "success">(
    "email"
  );
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) setError("");
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (passwordError) setPasswordError("");
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
    if (confirmPasswordError) setConfirmPasswordError("");
  };

  const validateEmailForm = () => {
    if (!email) {
      setError("Email is required");
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email");
      return false;
    }
    return true;
  };

  const validatePasswordForm = () => {
    let isValid = true;

    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      isValid = false;
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Please confirm your password");
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      isValid = false;
    }

    return isValid;
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmailForm()) return;

    setLoading(true);

    // Simulate API call for sending reset code
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 2000);
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePasswordForm()) return;

    setLoading(true);

    // Simulate API call for password reset
    setTimeout(() => {
      setLoading(false);
      setStep("success");
    }, 2000);
  };

  const handleContinueToNewPassword = () => {
    setSubmitted(false);
    setStep("newPassword");
  };

  if (submitted) {
    return (
      <div className="h-screen bg-[#F4F4F4] flex flex-col overflow-hidden">
        {/* Back Button */}
        <div className="px-5 py-3 flex-shrink-0">
          <Link
            href="/signin"
            className="inline-flex items-center justify-center w-[34px] h-[34px] rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-[#292929]" />
          </Link>
        </div>

        {/* Content Card */}
        <div className="flex-1 flex flex-col justify-center px-5 py-6">
          <div className="w-full max-w-md mx-auto sm:max-w-lg lg:max-w-xl">
            <div className="bg-white rounded-[20px] border border-[#EFEFEF] px-4 py-6 sm:px-6 lg:px-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="text-[28px] sm:text-[32px] lg:text-[36px] font-medium leading-[34px] sm:leading-[38px] lg:leading-[42px] text-[#292929] font-[Parkinsans] mb-3">
                Check Your Email
              </h1>
              <p className="text-[14px] sm:text-[15px] font-normal leading-[18px] sm:leading-[20px] text-[#656565] font-[Metropolis] mb-6 max-w-sm mx-auto">
                We&apos;ve sent password recovery instructions to{" "}
                <span className="font-medium text-[#292929]">{email}</span>
              </p>

              <button
                onClick={handleContinueToNewPassword}
                className="w-full h-[58px] sm:h-[64px] flex items-center justify-center bg-[#111111] hover:bg-[#222222] rounded-full mb-4 transition-colors"
              >
                <span className="text-[16px] sm:text-[17px] font-semibold leading-[22px] text-white font-[Parkinsans]">
                  Continue
                </span>
              </button>

              <button
                onClick={() => setSubmitted(false)}
                className="w-full h-[58px] sm:h-[64px] flex items-center justify-center bg-white border border-[#111111] rounded-full mb-4 transition-colors hover:bg-gray-50"
              >
                <span className="text-[16px] sm:text-[17px] font-semibold leading-[22px] text-[#111111] font-[Parkinsans]">
                  Try Another Email
                </span>
              </button>

              <div className="flex items-center justify-center gap-2">
                <span className="text-[14px] text-[#656565] font-[Metropolis]">
                  Remember Password?
                </span>
                <Link
                  href="/signin"
                  className="text-[14px] text-[#111111] font-bold font-[Parkinsans] hover:opacity-70 transition-opacity"
                >
                  Log In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Success screen (Reset Password 6)
  if (step === "success") {
    return (
      <div className="h-screen bg-[#F4F4F4] flex flex-col justify-center items-center px-5 py-6 overflow-hidden">
        <div className="w-full max-w-md mx-auto text-center flex-1 flex flex-col justify-center">
          {/* Success Icon - simplified representation of the Figma illustration */}
          <div className="mb-11">
            <div className="w-[300px] h-[310px] mx-auto mb-8 relative">
              {/* Simplified success illustration */}
              <div className="w-full h-full bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl flex items-center justify-center">
                <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-12 h-12 text-white" strokeWidth={3} />
                </div>
              </div>
            </div>
          </div>

          {/* Success Text */}
          <div className="mb-11">
            <h1 className="text-[26px] sm:text-[28px] font-medium leading-[36px] text-[#111111] font-[Parkinsans] mb-3">
              Password Reset Successful
            </h1>
            <p className="text-[15px] font-normal leading-[21px] text-[#111111]/80 font-[Metropolis]">
              You have successfully reset your password
            </p>
          </div>

          {/* Continue Button */}
          <button
            onClick={() => (window.location.href = "/signin")}
            className="w-full h-[58px] sm:h-[64px] flex items-center justify-center bg-[#111111] hover:bg-[#222222] rounded-full shadow-[0px_3px_32px_-1px_rgba(0,0,0,0.15)] transition-all duration-200"
          >
            <span className="text-[16px] sm:text-[17px] font-semibold leading-[22px] text-white font-[Parkinsans]">
              Continue to Log In
            </span>
          </button>
        </div>
      </div>
    );
  }

  // New password screen (Reset Password 5)
  if (step === "newPassword") {
    return (
      <div className="h-screen bg-[#F4F4F4] flex flex-col overflow-hidden">
        {/* Back Button */}
        <div className="px-5 py-3 flex-shrink-0">
          <button
            onClick={() => setStep("email")}
            className="inline-flex items-center justify-center w-[34px] h-[34px] rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-[#292929]" />
          </button>
        </div>

        {/* Content Container */}
        <div className="flex-1 flex flex-col justify-center px-5 py-6">
          <div className="w-full max-w-md mx-auto sm:max-w-lg lg:max-w-xl">
            <div className="bg-white rounded-[20px] border border-[#EFEFEF] px-4 py-6 sm:px-6 lg:px-8">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-[28px] sm:text-[32px] lg:text-[36px] font-medium leading-[34px] sm:leading-[38px] lg:leading-[42px] text-[#292929] font-[Parkinsans] mb-3 text-center">
                  Reset Your password
                </h1>
                <p className="text-[14px] sm:text-[15px] font-normal leading-[18px] sm:leading-[20px] text-[#656565] font-[Metropolis] text-center max-w-sm mx-auto">
                  You can now go ahead to set a new password
                </p>
              </div>

              {/* Password Form */}
              <form onSubmit={handlePasswordSubmit} className="space-y-6">
                {/* Password Input */}
                <div className="space-y-1">
                  <label className="text-[13px] font-medium leading-[19px] text-[#464646] font-[Parkinsans] block">
                    Password
                  </label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={password}
                      onChange={handlePasswordChange}
                      placeholder="Enter Password"
                      disabled={loading}
                      className="w-full h-[56px] sm:h-[60px] px-4 pr-12 border border-[#DCDCDC] rounded-[8px] bg-white font-[Metropolis] text-[14px] sm:text-[15px] leading-[20px] text-black placeholder:text-[#989898] focus:outline-none focus:border-[#111111] focus:ring-2 focus:ring-[#111111]/10 transition-all disabled:opacity-50"
                    />
                    <Button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#989898] hover:text-[#656565] transition-colors"
                    >
                      {showPassword ? (
                        <Eye className="w-5 h-5" />
                      ) : (
                        <EyeOff className="w-5 h-5" />
                      )}
                    </Button>
                  </div>
                  {passwordError && (
                    <p className="text-[12px] text-red-500 font-[Metropolis] mt-1">
                      {passwordError}
                    </p>
                  )}
                </div>

                {/* Confirm Password Input */}
                <div className="space-y-1">
                  <label className="text-[13px] font-medium leading-[19px] text-[#464646] font-[Parkinsans] block">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                      placeholder="Re-enter Password"
                      disabled={loading}
                      className="w-full h-[56px] sm:h-[60px] px-4 pr-12 border border-[#DCDCDC] rounded-[8px] bg-white font-[Metropolis] text-[14px] sm:text-[15px] leading-[20px] text-black placeholder:text-[#989898] focus:outline-none focus:border-[#111111] focus:ring-2 focus:ring-[#111111]/10 transition-all disabled:opacity-50"
                    />
                    <Button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#989898] hover:text-[#656565] transition-colors"
                    >
                      {showConfirmPassword ? (
                        <Eye className="w-5 h-5" />
                      ) : (
                        <EyeOff className="w-5 h-5" />
                      )}
                    </Button>
                  </div>
                  {confirmPasswordError && (
                    <p className="text-[12px] text-red-500 font-[Metropolis] mt-1">
                      {confirmPasswordError}
                    </p>
                  )}
                </div>

                {/* Reset Password Button */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-big sm:h-[64px] flex items-center justify-center bg-[#111111] hover:bg-[#222222] rounded-full shadow-[0px_3px_32px_-1px_rgba(0,0,0,0.15)] disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200"
                >
                  <span className="text-[16px] sm:text-[17px] font-semibold leading-[22px] text-white font-[Parkinsans]">
                    {loading ? "Resetting..." : "Reset Password"}
                  </span>
                </Button>
              </form>

              {/* Footer Links */}
              <div className="text-center mt-6">
                <div className="flex items-center justify-center mx-auto gap-2">
                  <span className="text-[14px] text-[#656565] font-[Metropolis]">
                    Remember Password?
                  </span>
                  <Link
                    href="/signin"
                    className="text-[14px] text-[#111111] font-bold font-[Parkinsans] hover:opacity-70 transition-opacity"
                  >
                    Log In
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Email step (Reset Password 1) - default
  return (
    <div className="h-screen bg-[#F4F4F4] flex flex-col overflow-hidden">
      {/* Back Button */}
      <div className="px-5 py-3 flex-shrink-0">
        <Link
          href="/signin"
          className="inline-flex items-center justify-center w-[34px] h-[34px] rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-[#292929]" />
        </Link>
      </div>

      {/* Content Container - responsive */}
      <div className="flex-1 flex flex-col justify-center px-5 py-6">
        <div className="w-full max-w-md mx-auto sm:max-w-lg lg:max-w-xl">
          {/* Card Container matching Figma */}
          <div className="bg-white rounded-[20px] border border-[#EFEFEF] px-4 py-6 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-[28px] sm:text-[32px] lg:text-[36px] font-medium leading-[34px] sm:leading-[38px] lg:leading-[42px] text-[#292929] font-[Parkinsans] mb-3 text-center">
                Reset Your password
              </h1>
              <p className="text-[14px] sm:text-[15px] font-normal leading-[18px] sm:leading-[20px] text-[#656565] font-[Metropolis] text-center max-w-sm mx-auto">
                Kindly provide your email account, to be able to reset your
                Password
              </p>
            </div>

            {/* Reset Password Form */}
            <form onSubmit={handleEmailSubmit} className="space-y-6">
              {/* Email Input - Custom styled to match Figma */}
              <div className="space-y-1">
                <label className="text-[13px] font-medium leading-[19px] text-[#464646] font-[Parkinsans] block">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Enter Email Address"
                    disabled={loading}
                    className="w-full h-[56px] sm:h-[60px] px-4 pr-12 border border-[#DCDCDC] rounded-[8px] bg-white font-[Metropolis] text-[14px] sm:text-[15px] leading-[20px] text-black placeholder:text-[#989898] focus:outline-none focus:border-[#111111] focus:ring-2 focus:ring-[#111111]/10 transition-all disabled:opacity-50"
                  />
                  {/* Email icon */}
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <Mail className="w-5 h-5 text-[#989898]" />
                  </div>
                </div>
                {error && (
                  <p className="text-[12px] text-red-500 font-[Metropolis] mt-1">
                    {error}
                  </p>
                )}
              </div>

              {/* Send Code Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-[58px] sm:h-[64px] flex items-center justify-center bg-[#111111] hover:bg-[#222222] rounded-full shadow-[0px_3px_32px_-1px_rgba(0,0,0,0.15)] disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200"
              >
                <span className="text-[16px] sm:text-[17px] font-semibold leading-[22px] text-white font-[Parkinsans]">
                  {loading ? "Sending..." : "Send Code"}
                </span>
              </button>
            </form>

            {/* Footer Links */}
            <div className="text-center mt-6">
              <div className="flex items-center justify-center gap-2">
                <span className="text-[14px] text-[#656565] font-[Metropolis]">
                  Remember Password?
                </span>
                <Link
                  href="/signin"
                  className="text-[14px] text-[#111111] font-bold font-[Parkinsans] hover:opacity-70 transition-opacity"
                >
                  Log In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
