'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';

export default function Onboarding4() {
  const router = useRouter();

  const handleNext = () => {
    router.push('/onboarding/5');
  };

  const handleSkip = () => {
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
            {/* Abstract Illustration - focused on suggestion/input theme */}
            <div className="w-80 md:w-96 lg:w-[500px] h-70 md:h-96 lg:h-[500px] relative">
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Main container representing input/suggestion interface */}
                <div className="w-72 md:w-80 lg:w-96 h-64 md:h-72 lg:h-80 bg-[#FEFEFE] border-2 md:border-3 lg:border-4 border-[#111111] rounded-lg md:rounded-xl lg:rounded-2xl relative p-6 md:p-8 lg:p-10 shadow-lg">
                  {/* Header area */}
                  <div className="absolute top-4 md:top-6 lg:top-8 left-4 md:left-6 lg:left-8 right-4 md:right-6 lg:right-8 flex items-center justify-between">
                    <div className="w-8 md:w-10 lg:w-12 h-2 md:h-2.5 lg:h-3 bg-[#111111] rounded-full"></div>
                    <div className="w-6 md:w-7 lg:w-8 h-6 md:h-7 lg:h-8 border-2 md:border-3 lg:border-4 border-[#111111] rounded-full bg-[#FEFEFE]"></div>
                  </div>

                  {/* Input field representation */}
                  <div className="absolute top-16 md:top-20 lg:top-24 left-4 md:left-6 lg:left-8 right-4 md:right-6 lg:right-8 h-12 md:h-14 lg:h-16 bg-white border-2 md:border-3 lg:border-4 border-[#111111] rounded-lg md:rounded-xl lg:rounded-2xl flex items-center px-3 md:px-4 lg:px-5 shadow-sm">
                    <div className="text-sm md:text-base lg:text-lg text-[#111111] font-medium">
                      Type your word...
                    </div>
                  </div>

                  {/* Suggestion type indicators */}
                  <div className="absolute top-32 md:top-40 lg:top-48 left-4 md:left-6 lg:left-8 right-4 md:right-6 lg:right-8 space-y-2 md:space-y-3 lg:space-y-4">
                    <div className="flex space-x-2 md:space-x-3 lg:space-x-4">
                      <div className="w-16 md:w-20 lg:w-24 h-6 md:h-7 lg:h-8 bg-[#FEFEFE] border border-[#111111] rounded md:rounded-lg text-xs md:text-sm lg:text-base flex items-center justify-center shadow-sm">
                        <span className="text-[#111111] font-medium">Root</span>
                      </div>
                      <div className="w-20 md:w-24 lg:w-28 h-6 md:h-7 lg:h-8 bg-[#111111] rounded md:rounded-lg text-xs md:text-sm lg:text-base flex items-center justify-center shadow-md">
                        <span className="text-white font-medium">Adaptive</span>
                      </div>
                    </div>
                    <div className="flex space-x-2 md:space-x-3 lg:space-x-4">
                      <div className="w-18 md:w-22 lg:w-26 h-6 md:h-7 lg:h-8 bg-[#FEFEFE] border border-[#111111] rounded md:rounded-lg text-xs md:text-sm lg:text-base flex items-center justify-center px-2 md:px-3 lg:px-4 shadow-sm">
                        <span className="text-[#111111] font-medium">
                          Creative
                        </span>
                      </div>
                      <div className="w-20 md:w-24 lg:w-28 h-6 md:h-7 lg:h-8 bg-[#FEFEFE] border border-[#111111] rounded md:rounded-lg text-xs md:text-sm lg:text-base flex items-center justify-center shadow-sm">
                        <span className="text-[#111111] font-medium">
                          Functional
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Mic icon */}
                  <div className="absolute bottom-6 md:bottom-8 lg:bottom-10 right-6 md:right-8 lg:right-10 w-8 md:w-10 lg:w-12 h-8 md:h-10 lg:h-12 bg-[#111111] rounded-full flex items-center justify-center shadow-md">
                    <div className="w-3 md:w-4 lg:w-5 h-4 md:h-5 lg:h-6 bg-white rounded-sm"></div>
                  </div>

                  {/* Submit button */}
                  <div className="absolute bottom-6 md:bottom-8 lg:bottom-10 left-4 md:left-6 lg:left-8 w-16 md:w-20 lg:w-24 h-8 md:h-10 lg:h-12 bg-[#111111] rounded md:rounded-lg lg:rounded-xl flex items-center justify-center shadow-md">
                    <span className="text-xs md:text-sm lg:text-base text-white font-medium">
                      Submit
                    </span>
                  </div>
                </div>

                {/* Floating suggestion bubbles */}
                <div className="absolute top-8 md:top-10 lg:top-12 -left-4 md:-left-6 lg:-left-8 w-16 md:w-20 lg:w-24 h-8 md:h-10 lg:h-12 bg-white border border-[#111111] rounded-lg md:rounded-xl flex items-center justify-center shadow-md">
                  <span className="text-xs md:text-sm lg:text-base text-[#111111] font-medium">
                    Yoruba
                  </span>
                </div>
                <div className="absolute bottom-12 md:bottom-16 lg:bottom-20 -right-8 md:-right-10 lg:-right-12 w-18 md:w-22 lg:w-26 h-8 md:h-10 lg:h-12 bg-[#FEFEFE] border border-[#111111] rounded-lg md:rounded-xl flex items-center justify-center px-2 md:px-3 lg:px-4 shadow-md">
                  <span className="text-xs md:text-sm lg:text-base text-[#111111] font-medium">
                    Suggest
                  </span>
                </div>
                <div className="absolute top-20 md:top-24 lg:top-28 right-4 md:right-6 lg:right-8 w-14 md:w-18 lg:w-22 h-8 md:h-10 lg:h-12 bg-white border border-[#111111] rounded-lg md:rounded-xl flex items-center justify-center shadow-md">
                  <span className="text-xs md:text-sm lg:text-base text-[#111111] font-medium">
                    Ideas
                  </span>
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-2 md:-top-3 lg:-top-4 left-8 md:left-10 lg:left-12 w-3 md:w-4 lg:w-5 h-3 md:h-4 lg:h-5 bg-[#EBEBEB] rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="space-y-6 md:space-y-8 lg:space-y-10 lg:flex-shrink-0 lg:max-w-md xl:max-w-lg pt-16">
            {/* Text Content */}
            <div className="text-center lg:text-left space-y-3 md:space-y-4 lg:space-y-5">
              <h1 className="text-[26px] md:text-[32px] lg:text-[38px] xl:text-[42px] font-medium leading-[36px] md:leading-[42px] lg:leading-[48px] xl:leading-[52px] tracking-[-0.5px] text-[#111111] font-[Parkinsans]">
                Suggest Words Your Way
              </h1>
              <p className="text-[14px] md:text-[17px] lg:text-[19px] xl:text-[21px] font-normal leading-[21px] md:leading-[25px] lg:leading-[28px] xl:leading-[31px] text-[rgba(17,17,17,0.8)] font-[Metropolis] max-w-lg mx-auto lg:mx-0">
                Suggest words, adaptive, functional, rooted, or playful. Every
                idea helps shape the dictionary.
              </p>
            </div>

            {/* Progress Indicators */}
            <div className="flex justify-center lg:justify-start items-center space-x-2 md:space-x-3">
              <div className="w-[10px] md:w-[12px] lg:w-[14px] h-2 md:h-2.5 lg:h-3 bg-[rgba(17,17,17,0.2)] rounded-full"></div>
              <div className="w-[50px] md:w-[60px] lg:w-[70px] h-2 md:h-2.5 lg:h-3 bg-[#111111] rounded-full"></div>
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
