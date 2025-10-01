'use client';

import { useRouter } from 'next/navigation';

export default function EmailVerification1() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleContinue = () => {
    router.push('/email-verification/2');
  };

  return (
    <div className="min-h-screen bg-[#F4F4F4] flex flex-col">
      {/* Back Button */}
      <div className="absolute top-[77px] md:top-[90px] lg:top-[110px] left-6 md:left-8 lg:left-12 z-10">
        <button
          onClick={handleBack}
          className="w-[34px] h-[34px] md:w-[40px] md:h-[40px] lg:w-[44px] lg:h-[44px] flex items-center justify-center rounded-full hover:bg-white/50 transition-colors"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="md:w-6 md:h-6 lg:w-7 lg:h-7">
            <path d="M20 12H4M4 12L10 6M4 12L10 18" stroke="#292929" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Progress Indicators */}
      <div className="absolute top-[90px] md:top-[103px] lg:top-[123px] left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-16 md:w-20 lg:w-24 h-[3px] md:h-[4px] lg:h-[5px] bg-[#111111] rounded-full"></div>
          <div className="w-16 md:w-20 lg:w-24 h-[3px] md:h-[4px] lg:h-[5px] bg-[#D9D9D9] rounded-full"></div>
          <div className="w-16 md:w-20 lg:w-24 h-[3px] md:h-[4px] lg:h-[5px] bg-[#D9D9D9] rounded-full"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center px-6 md:px-8 lg:px-12 pt-[220px] md:pt-[260px] lg:pt-[300px]">
        
        {/* Email Illustration */}
        <div className="w-[310px] md:w-[380px] lg:w-[450px] h-[300px] md:h-[360px] lg:h-[420px] mb-11 md:mb-14 lg:mb-16 relative">
          {/* Simplified email illustration */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-64 md:w-80 lg:w-96 h-48 md:h-60 lg:h-72 bg-white border-2 md:border-3 lg:border-4 border-[#111111] rounded-lg md:rounded-xl lg:rounded-2xl relative shadow-lg">
              {/* Email envelope */}
              <div className="absolute top-4 md:top-6 lg:top-8 left-4 md:left-6 lg:left-8 right-4 md:right-6 lg:right-8 bottom-4 md:bottom-6 lg:bottom-8 border border-[#D9D9D9] rounded md:rounded-lg">
                <div className="absolute top-2 md:top-3 lg:top-4 left-2 md:left-3 lg:left-4 right-2 md:right-3 lg:right-4">
                  <div className="flex items-center justify-center h-8 md:h-10 lg:h-12 bg-[#F0F0F0] rounded md:rounded-lg">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#111111] md:w-7 md:h-7 lg:w-8 lg:h-8">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2"/>
                      <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </div>
                </div>
                <div className="absolute bottom-2 md:bottom-3 lg:bottom-4 left-2 md:left-3 lg:left-4 right-2 md:right-3 lg:right-4 space-y-1 md:space-y-2">
                  <div className="h-1 md:h-1.5 lg:h-2 bg-[#D9D9D9] rounded w-3/4"></div>
                  <div className="h-1 md:h-1.5 lg:h-2 bg-[#D9D9D9] rounded w-1/2"></div>
                  <div className="h-1 md:h-1.5 lg:h-2 bg-[#D9D9D9] rounded w-2/3"></div>
                </div>
              </div>
              
              {/* Checkmark or verification symbol */}
              <div className="absolute -top-4 md:-top-6 lg:-top-8 -right-4 md:-right-6 lg:-right-8 w-12 md:w-16 lg:w-20 h-12 md:h-16 lg:h-20 bg-[#111111] rounded-full flex items-center justify-center shadow-lg">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white md:w-6 md:h-6 lg:w-7 lg:h-7">
                  <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="w-full max-w-[382px] md:max-w-[480px] lg:max-w-[580px] space-y-11 md:space-y-14 lg:space-y-16">
          
          {/* Text Content */}
          <div className="text-center space-y-3 md:space-y-4 lg:space-y-5">
            <h1 className="text-[26px] md:text-[32px] lg:text-[38px] font-medium leading-[36px] md:leading-[42px] lg:leading-[48px] tracking-[-1.9230769230769231%] text-[#111111] font-[Parkinsans]">
              Account Created!
            </h1>
            <p className="text-[15px] md:text-[17px] lg:text-[19px] font-normal leading-[21px] md:leading-[25px] lg:leading-[28px] text-[rgba(17,17,17,0.8)] font-[Metropolis] max-w-md md:max-w-lg lg:max-w-xl mx-auto">
              You have successfully created your account, The next step requires you to verify your email address
            </p>
          </div>

          {/* Action Button */}
          <button
            onClick={handleContinue}
            className="w-full h-[58px] md:h-[64px] lg:h-[70px] flex items-center justify-center bg-[#111111] rounded-full shadow-[0px_3px_32px_-1px_rgba(0,0,0,0.15)] hover:bg-[#333333] active:scale-[0.98] transition-all"
          >
            <span className="text-[16px] md:text-[18px] lg:text-[20px] font-semibold leading-[22px] md:leading-[24px] lg:leading-[26px] text-white font-[Parkinsans]">
              Verify Email Address
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}