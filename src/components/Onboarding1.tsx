'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';
import { getOnboardingSeen, setOnboardingSeen } from '@/lib/onboarding';

export default function Onboarding1() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const seen = getOnboardingSeen();
    if (seen) {
      // If user already saw onboarding, send them to home if authenticated, otherwise to signin
      if (isAuthenticated) router.push('/home');
      else router.push('/signin');
    }
  }, [isAuthenticated, router]);

  const handleNext = () => {
    router.push('/onboarding/4');
  };

  const handleSkip = () => {
    setOnboardingSeen(true);
    router.push('/signup');
  };
  return (
    <div className="h-screen bg-[#F4F4F4] flex flex-col overflow-hidden">
      {/* Main Content */}
      <div className="flex-1 flex flex-col px-10 md:px-8 lg:px-12 pt-8 md:pt-12 lg:pt-26 py-16 md:pb-8 lg:pb-10 mb-16">
        {/* Container for responsive layout */}
        <div className="flex-1 flex flex-col lg:flex-row lg:items-center lg:justify-between max-w-7xl mx-auto w-full">
          {/* Illustration Area */}
          <div className="flex-1 flex items-center justify-center relative lg:mr-12">
            {/* Abstract Illustration */}
            <div className="w-80 md:w-96 lg:w-[480px] h-80 md:h-96 lg:h-[480px] relative">
              {/* Background shapes - simplified abstract representation */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Main circle */}
                <div className="w-64 md:w-80 lg:w-96 h-64 md:h-80 lg:h-96 border-4 md:border-5 lg:border-6 border-[#111111] rounded-full relative">
                  {/* Inner elements */}
                  <div className="absolute top-8 md:top-10 lg:top-12 left-8 md:left-10 lg:left-12 w-8 md:w-10 lg:w-12 h-8 md:h-10 lg:h-12 bg-[#111111] rounded-full"></div>
                  <div className="absolute top-12 md:top-16 lg:top-20 right-12 md:right-16 lg:right-20 w-6 md:w-8 lg:w-10 h-6 md:h-8 lg:h-10 bg-[#FEFEFE] border-2 md:border-3 lg:border-4 border-[#111111] rounded-full"></div>
                  <div className="absolute bottom-16 md:bottom-20 lg:bottom-24 left-16 md:left-20 lg:left-24 w-12 md:w-16 lg:w-20 h-12 md:h-16 lg:h-20 bg-[#FEFEFE] border-2 md:border-3 lg:border-4 border-[#111111] rounded md:rounded-lg lg:rounded-xl"></div>
                  <div className="absolute bottom-8 md:bottom-10 lg:bottom-12 right-8 md:right-10 lg:right-12 w-16 md:w-20 lg:w-24 h-8 md:h-10 lg:h-12 bg-[#111111] rounded-lg md:rounded-xl lg:rounded-2xl"></div>

                  {/* Text elements representing words */}
                  <div className="absolute top-20 md:top-24 lg:top-28 left-1/2 transform -translate-x-1/2">
                    <div className="text-xs md:text-sm lg:text-base font-medium text-[#111111] bg-white px-2 md:px-3 lg:px-4 py-1 md:py-1.5 lg:py-2 rounded md:rounded-lg border shadow-sm">
                      Words
                    </div>
                  </div>
                  <div className="absolute bottom-20 md:bottom-24 lg:bottom-28 left-1/4">
                    <div className="text-xs md:text-sm lg:text-base font-medium text-[#111111] bg-[#FEFEFE] px-2 md:px-3 lg:px-4 py-1 md:py-1.5 lg:py-2 rounded md:rounded-lg border shadow-sm">
                      Ideas
                    </div>
                  </div>
                  <div className="absolute right-8 md:right-10 lg:right-12 top-1/2 transform -translate-y-1/2">
                    <div className="text-xs md:text-sm lg:text-base font-medium text-[#111111] bg-white px-2 md:px-3 lg:px-4 py-1 md:py-1.5 lg:py-2 rounded md:rounded-lg border shadow-sm">
                      Language
                    </div>
                  </div>
                </div>

                {/* Outer decorative elements */}
                <div className="absolute -top-4 md:-top-5 lg:-top-6 left-12 md:left-16 lg:left-20 w-4 md:w-5 lg:w-6 h-4 md:h-5 lg:h-6 bg-[#EBEBEB] rounded-full"></div>
                <div className="absolute top-1/3 -left-8 md:-left-10 lg:-left-12 w-6 md:w-7 lg:w-8 h-6 md:h-7 lg:h-8 bg-[#FEFEFE] border md:border-2 border-[#111111] rounded-full"></div>
                <div className="absolute bottom-1/3 -right-6 md:-right-8 lg:-right-10 w-5 md:w-6 lg:w-7 h-5 md:h-6 lg:h-7 bg-[#3E3E3E] rounded md:rounded-lg"></div>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="space-y-6 md:space-y-8 lg:space-y-10 lg:flex-shrink-0 lg:max-w-md xl:max-w-lg">
            {/* Text Content */}
            <div className="text-center lg:text-left space-y-3 md:space-y-4 lg:space-y-5">
              <h1 className="text-[26px] md:text-[32px] lg:text-[38px] xl:text-[42px] font-medium leading-[36px] md:leading-[42px] lg:leading-[48px] xl:leading-[52px] tracking-[-0.5px] text-[#111111] font-[Parkinsans]">
                Curate Words That Matter To You
              </h1>
              <p className="text-[14px] md:text-[17px] lg:text-[19px] xl:text-[21px] font-normal leading-[21px] md:leading-[25px] lg:leading-[28px] xl:leading-[31px] text-[rgba(17,17,17,0.8)] font-[Metropolis] lg:px-0 max-w-lg lg:mx-0">
                Explore fresh word ideas every day and see how language evolves
                through the community.
              </p>
            </div>

            {/* Progress Indicators */}
            <div className="flex justify-center lg:justify-start items-center space-x-2 md:space-x-3">
              <div className="w-[50px] md:w-[60px] lg:w-[70px] h-2 md:h-2.5 lg:h-3 bg-[#111111] rounded-full"></div>
              <div className="w-[10px] md:w-[12px] lg:w-[14px] h-2 md:h-2.5 lg:h-3 bg-[rgba(17,17,17,0.2)] rounded-full"></div>
              <div className="w-[10px] md:w-[12px] lg:w-[14px] h-2 md:h-2.5 lg:h-3 bg-[rgba(17,17,17,0.2)] rounded-full"></div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-6 md:space-x-8">
              <Button
                onClick={handleSkip}
                className="flex-1 btn-big md:h-[64px] lg:h-[70px] flex items-center justify-center border border-[rgba(17,17,17,0.7)] rounded-full bg-transparent hover:bg-[rgba(17,17,17,0.05)] transition-all active:scale-[0.98]"
              >
                <span className="text-[16px] md:text-[18px] lg:text-[20px] font-bold leading-[22px] md:leading-[24px] lg:leading-[26px] text-[rgba(17,17,17,0.7)] font-[Parkinsans]">
                  Skip
                </span>
              </Button>

              <Button
                onClick={handleNext}
                className="flex-1 btn-big md:h-[64px] lg:h-[70px] flex items-center justify-center bg-[#111111] rounded-full shadow-[0px_3px_32px_-1px_rgba(0,0,0,0.15)] hover:bg-[#333333] transition-all active:scale-[0.98]"
              >
                <span className="text-[16px] md:text-[18px] lg:text-[20px] font-semibold leading-[22px] md:leading-[24px] lg:leading-[26px] text-white font-[Parkinsans]">
                  Next
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
