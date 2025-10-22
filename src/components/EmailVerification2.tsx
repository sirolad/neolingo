'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type VerificationState = 'initial' | 'error' | 'resent';

export default function EmailVerification2() {
  const router = useRouter();
  const [code, setCode] = useState(['', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(59);
  const [state, setState] = useState<VerificationState>('initial');
  const [showResendMessage, setShowResendMessage] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    // Focus first input on mount
    setTimeout(() => {
      inputRefs.current[0]?.focus();
    }, 100);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Hide resend message after 3 seconds
    if (showResendMessage) {
      const messageTimer = setTimeout(() => {
        setShowResendMessage(false);
      }, 3000);
      return () => clearTimeout(messageTimer);
    }
  }, [showResendMessage]);

  const handleBack = () => {
    router.back();
  };

  const handleCodeChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Clear error state when user starts typing
      if (state === 'error') {
        setState('initial');
      }

      // Move to next input if value is entered
      if (value && index < 4) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    // Check if code is complete
    if (code.every(digit => digit !== '')) {
      const codeString = code.join('');

      // Simulate verification process - in real app, this would make an API call
      // For demo purposes:
      // - Codes starting with '1' are valid
      // - Code '61237' triggers error state (as seen in Figma)
      // - Other codes also trigger error for demonstration

      if (codeString === '12345' || codeString.startsWith('1')) {
        // Valid code - go to success screen
        router.push('/email-verification/5');
      } else {
        // Invalid code - show error state
        setState('error');
        setCode(['6', '1', '2', '3', '7']); // Show the error code from Figma
      }
    }
  };

  const handleResendCode = () => {
    setTimeLeft(59);
    setCode(['', '', '', '', '']);
    setState('resent');
    setShowResendMessage(true);
    inputRefs.current[0]?.focus();
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const isCodeComplete = code.every(digit => digit !== '');
  const isError = state === 'error';

  return (
    <div className="min-h-screen bg-[#F4F4F4] flex flex-col">
      {/* Back Button */}
      <div className="absolute top-[78px] md:top-[90px] lg:top-[110px] left-5 md:left-8 lg:left-12 z-10">
        <button
          onClick={handleBack}
          className="w-[34px] h-[34px] md:w-[40px] md:h-[40px] lg:w-[44px] lg:h-[44px] flex items-center justify-center rounded-full hover:bg-white/50 transition-colors"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="md:w-6 md:h-6 lg:w-7 lg:h-7"
          >
            <path
              d="M20 12H4M4 12L10 6M4 12L10 18"
              stroke="#292929"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Resend Confirmation Message */}
      {showResendMessage && (
        <div className="absolute top-[130px] md:top-[150px] lg:top-[170px] left-1/2 transform -translate-x-1/2 z-20">
          <div className="bg-[#4CAF50] text-white px-6 md:px-8 lg:px-10 py-3 md:py-4 lg:py-5 rounded-lg md:rounded-xl lg:rounded-2xl shadow-lg">
            <p className="text-[14px] md:text-[16px] lg:text-[18px] font-medium font-[Metropolis]">
              Verification code resent successfully!
            </p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col px-5 md:px-8 lg:px-12 pt-[136px] md:pt-[160px] lg:pt-[180px]">
        {/* Content Card */}
        <div className="bg-white rounded-[20px] md:rounded-[24px] lg:rounded-[28px] border border-[#EFEFEF] p-4 md:p-6 lg:p-8 mx-auto w-full max-w-[390px] md:max-w-[480px] lg:max-w-[560px] shadow-sm">
          {/* Header */}
          <div className="mb-6 md:mb-8 lg:mb-10">
            <h1 className="text-[28px] md:text-[32px] lg:text-[36px] font-medium leading-[34px] md:leading-[38px] lg:leading-[42px] text-[#292929] font-[Parkinsans] mb-2 md:mb-3 lg:mb-4">
              Enter Verification Code
            </h1>
            <p className="text-[14px] md:text-[16px] lg:text-[18px] font-normal leading-[18px] md:leading-[22px] lg:leading-[26px] text-[#656565] font-[Metropolis]">
              {state === 'resent'
                ? "We've sent a new activation code to your email johndoe@gmail.com"
                : "We've sent an activation code to your email johndoe@gmail.com"}
            </p>
          </div>

          {/* Code Input Fields with Error State */}
          <div className="mb-6 md:mb-8 lg:mb-10">
            <div className="flex justify-center gap-3 md:gap-4 lg:gap-5 mb-4 md:mb-5 lg:mb-6">
              {code.map((digit, index) => (
                <div key={index} className="relative">
                  <input
                    ref={el => {
                      inputRefs.current[index] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={e => handleCodeChange(index, e.target.value)}
                    onKeyDown={e => handleKeyDown(index, e)}
                    className={`w-[48px] h-[48px] md:w-[56px] md:h-[56px] lg:w-[64px] lg:h-[64px] text-center text-[21px] md:text-[24px] lg:text-[28px] font-semibold border rounded-[2px] md:rounded-[3px] lg:rounded-[4px] font-[Montserrat] focus:outline-none focus:ring-2 focus:ring-[#111111] focus:ring-opacity-50 transition-all ${
                      isError
                        ? 'border-[#CB0000] border-b-2 md:border-b-3 lg:border-b-4 bg-white text-[#111111]'
                        : digit
                          ? 'border-[#454545] border-b-2 md:border-b-3 lg:border-b-4 bg-white text-[#111111]'
                          : 'border-[#888888] border-b-2 md:border-b-3 lg:border-b-4 bg-white text-[#111111]'
                    }`}
                    style={{
                      borderTop: 'none',
                      borderLeft: 'none',
                      borderRight: 'none',
                    }}
                  />
                </div>
              ))}

              {/* Error Icon */}
              {isError && (
                <div className="flex items-center ml-3 md:ml-4 lg:ml-5">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-[#CB0000] md:w-7 md:h-7 lg:w-8 lg:h-8"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M15 9l-6 6M9 9l6 6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              )}
            </div>

            {/* Error Message */}
            {isError && (
              <div className="text-center mb-4 md:mb-5 lg:mb-6">
                <p className="text-[14px] md:text-[16px] lg:text-[18px] font-normal text-[#CB0000] font-[Metropolis]">
                  Invalid Verification Code
                </p>
              </div>
            )}
          </div>

          {/* Timer and Resend */}
          <div className="flex justify-between items-center mb-6 md:mb-8 lg:mb-10">
            <div className="flex items-center gap-1 md:gap-2">
              <span className="text-[14px] md:text-[16px] lg:text-[18px] font-normal text-[#656565] font-[Metropolis]">
                Code expires in:
              </span>
              <span className="text-[14px] md:text-[16px] lg:text-[18px] font-semibold text-[rgba(17,17,17,0.8)] font-[Parkinsans]">
                {formatTime(timeLeft)}
              </span>
            </div>
            <button
              onClick={handleResendCode}
              disabled={timeLeft > 0}
              className="text-[14px] md:text-[16px] lg:text-[18px] font-semibold text-[rgba(17,17,17,0.8)] font-[Parkinsans] disabled:opacity-50 hover:text-[#111111] disabled:hover:text-[rgba(17,17,17,0.8)] transition-colors"
            >
              Resend Code
            </button>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="mt-auto pb-6 md:pb-8 lg:pb-10 px-5 md:px-8 lg:px-12 space-y-8 md:space-y-10 lg:space-y-12">
          <div className="max-w-[390px] md:max-w-[480px] lg:max-w-[560px] mx-auto space-y-8 md:space-y-10 lg:space-y-12">
            {/* Verify Button - Disabled during error state */}
            <button
              onClick={handleVerify}
              disabled={!isCodeComplete || isError}
              className={`w-full h-[58px] md:h-[64px] lg:h-[70px] flex items-center justify-center rounded-full transition-all ${
                !isError && isCodeComplete
                  ? 'bg-[#111111] shadow-[0px_3px_32px_-1px_rgba(0,0,0,0.15)] hover:bg-[#333333] active:scale-[0.98]'
                  : 'bg-[rgba(17,17,17,0.4)]'
              }`}
            >
              <span className="text-[16px] md:text-[18px] lg:text-[20px] font-semibold leading-[22px] md:leading-[24px] lg:leading-[26px] text-white font-[Parkinsans]">
                Verify Email Address
              </span>
            </button>

            {/* Sign In Link */}
            <div className="flex justify-end">
              <div className="flex items-center gap-2 md:gap-3">
                <span className="text-[14px] md:text-[16px] lg:text-[18px] font-normal text-[rgba(17,17,17,0.6)] font-[Metropolis]">
                  Have an account?
                </span>
                <a
                  href="/signin"
                  className="text-[14px] md:text-[16px] lg:text-[18px] font-normal text-[#111111] font-[Montserrat] tracking-[2%] hover:opacity-70 transition-opacity"
                >
                  Sign In
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
