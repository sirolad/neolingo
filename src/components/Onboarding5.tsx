'use client';

import { useRouter } from 'next/navigation';

export default function Onboarding5() {
  const router = useRouter();

  const handleContinue = () => {
    router.push('/signup');
  };

  return (
    <div className="h-screen bg-[#F4F4F4] flex flex-col overflow-hidden">
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col px-10 md:px-8 lg:px-12 pt-8 md:pt-12 lg:pt-26 py-16 md:pb-8 lg:pb-10 mb-16">
        
        {/* Container for responsive layout */}
        <div className="flex-1 flex flex-col lg:flex-row lg:items-center lg:justify-between max-w-7xl mx-auto w-full">
          
          {/* Illustration Area */}
          <div className="flex-1 flex items-center justify-center relative lg:mr-12 pt-4">
            {/* Abstract Illustration - focused on voting/community theme */}
            <div className="w-80 md:w-96 lg:w-[520px] h-80 md:h-96 lg:h-[520px] relative">
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Main voting interface container */}
                <div className="w-80 md:w-96 lg:w-[400px] h-64 md:h-80 lg:h-96 bg-[#FEFEFE] border-2 md:border-3 lg:border-4 border-[#111111] rounded-lg md:rounded-xl lg:rounded-2xl relative p-4 md:p-6 lg:p-8 shadow-lg">
                  {/* Header */}
                  <div className="absolute top-4 md:top-6 lg:top-8 left-4 md:left-6 lg:left-8 right-4 md:right-6 lg:right-8 text-center">
                    <div className="text-sm md:text-base lg:text-lg font-medium text-[#111111]">Choose the best word</div>
                  </div>
                  
                  {/* Voting options */}
                  <div className="absolute top-16 md:top-20 lg:top-24 left-4 md:left-6 lg:left-8 right-4 md:right-6 lg:right-8 space-y-3 md:space-y-4 lg:space-y-5">
                    {/* Option 1 - selected */}
                    <div className="h-12 md:h-14 lg:h-16 bg-[#111111] rounded-lg md:rounded-xl lg:rounded-2xl flex items-center justify-between px-4 md:px-5 lg:px-6 shadow-md">
                      <span className="text-sm md:text-base lg:text-lg font-medium text-white">àgbèrò</span>
                      <div className="w-6 md:w-7 lg:w-8 h-6 md:h-7 lg:h-8 bg-white rounded-full flex items-center justify-center">
                        <div className="w-3 md:w-3.5 lg:w-4 h-3 md:h-3.5 lg:h-4 bg-[#111111] rounded-full"></div>
                      </div>
                    </div>
                    
                    {/* Option 2 */}
                    <div className="h-12 md:h-14 lg:h-16 bg-[#FEFEFE] border border-[#111111] rounded-lg md:rounded-xl lg:rounded-2xl flex items-center justify-between px-4 md:px-5 lg:px-6 shadow-sm">
                      <span className="text-sm md:text-base lg:text-lg font-medium text-[#111111]">ìmọ̀-ẹ̀rọ</span>
                      <div className="w-6 md:w-7 lg:w-8 h-6 md:h-7 lg:h-8 border-2 md:border-3 border-[#111111] bg-[#FEFEFE] rounded-full"></div>
                    </div>
                    
                    {/* Option 3 */}
                    <div className="h-12 md:h-14 lg:h-16 bg-[#FEFEFE] border border-[#111111] rounded-lg md:rounded-xl lg:rounded-2xl flex items-center justify-between px-4 md:px-5 lg:px-6 shadow-sm">
                      <span className="text-sm md:text-base lg:text-lg font-medium text-[#111111]">tẹknọ́lọ́jì</span>
                      <div className="w-6 md:w-7 lg:w-8 h-6 md:h-7 lg:h-8 border-2 md:border-3 border-[#111111] bg-[#FEFEFE] rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* Vote button */}
                  <div className="absolute bottom-4 md:bottom-6 lg:bottom-8 left-4 md:left-6 lg:left-8 right-4 md:right-6 lg:right-8">
                    <div className="h-10 md:h-12 lg:h-14 bg-[#111111] rounded-lg md:rounded-xl lg:rounded-2xl flex items-center justify-center shadow-md">
                      <span className="text-sm md:text-base lg:text-lg font-semibold text-white">Vote</span>
                    </div>
                  </div>
                </div>
                
                {/* Community indicators */}
                <div className="absolute top-4 md:top-6 lg:top-8 -left-8 md:-left-10 lg:-left-12 w-12 md:w-16 lg:w-20 h-8 md:h-10 lg:h-12 bg-white border border-[#111111] rounded-lg md:rounded-xl flex items-center justify-center shadow-md">
                  <span className="text-xs md:text-sm lg:text-base text-[#111111] font-medium">+5</span>
                </div>
                <div className="absolute top-8 md:top-12 lg:top-16 right-0 lg:right-4 w-16 md:w-20 lg:w-24 h-8 md:h-10 lg:h-12 bg-[#FEFEFE] border border-[#111111] rounded-lg md:rounded-xl flex items-center justify-center shadow-md">
                  <span className="text-xs md:text-sm lg:text-base text-[#111111] font-medium">Users</span>
                </div>
                <div className="absolute bottom-8 md:bottom-12 lg:bottom-16 -left-4 md:-left-6 lg:-left-8 w-14 md:w-18 lg:w-22 h-8 md:h-10 lg:h-12 bg-white border border-[#111111] rounded-lg md:rounded-xl flex items-center justify-center shadow-md">
                  <span className="text-xs md:text-sm lg:text-base text-[#111111] font-medium">Vote</span>
                </div>
                <div className="absolute -top-4 md:-top-6 lg:-top-8 right-12 md:right-16 lg:right-20 w-18 md:w-22 lg:w-28 h-8 md:h-10 lg:h-12 bg-[#FEFEFE] border border-[#111111] rounded-lg md:rounded-xl flex items-center justify-center px-2 md:px-3 lg:px-4 shadow-md">
                  <span className="text-xs md:text-sm lg:text-base text-[#111111] font-medium">Community</span>
                </div>
                
                {/* User avatars representation */}
                <div className="absolute top-12 md:top-16 lg:top-20 -right-12 md:-right-16 lg:-right-20 flex space-x-1 md:space-x-1.5 lg:space-x-2">
                  <div className="w-6 md:w-8 lg:w-10 h-6 md:h-8 lg:h-10 bg-[#111111] rounded-full shadow-sm"></div>
                  <div className="w-6 md:w-8 lg:w-10 h-6 md:h-8 lg:h-10 bg-[#FEFEFE] border border-[#111111] rounded-full shadow-sm"></div>
                  <div className="w-6 md:w-8 lg:w-10 h-6 md:h-8 lg:h-10 bg-[#111111] rounded-full shadow-sm"></div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -bottom-4 md:-bottom-5 lg:-bottom-6 left-8 md:left-12 lg:left-16 w-4 md:w-5 lg:w-6 h-4 md:h-5 lg:h-6 bg-[#EBEBEB] rounded-full"></div>
                <div className="absolute -top-2 md:-top-3 lg:-top-4 left-16 md:left-20 lg:left-24 w-3 md:w-4 lg:w-5 h-3 md:h-4 lg:h-5 bg-[#111111] rounded md:rounded-lg"></div>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="space-y-6 md:space-y-8 lg:space-y-10 mt-8 lg:mt-0 lg:flex-shrink-0 lg:max-w-md xl:max-w-lg">
            {/* Text Content */}
            <div className="text-center lg:text-left space-y-3 md:space-y-4 lg:space-y-5">
              <h1 className="text-[26px] md:text-[32px] lg:text-[38px] xl:text-[42px] font-medium leading-[36px] md:leading-[42px] lg:leading-[48px] xl:leading-[52px] tracking-[-0.5px] text-[#111111] font-[Parkinsans]">
                Vote & Build the Dictionary
              </h1>
              <p className="text-[15px] md:text-[17px] lg:text-[19px] xl:text-[21px] font-normal leading-[21px] md:leading-[25px] lg:leading-[28px] xl:leading-[31px] text-[rgba(17,17,17,0.8)] font-[Metropolis] px-4 lg:px-0 max-w-lg mx-auto lg:mx-0">
                Join other users in choosing the best word from the suggested words. Your vote decides what stays.
              </p>
            </div>

            {/* Progress Indicators */}
            <div className="flex justify-center lg:justify-start items-center space-x-2 md:space-x-3">
              <div className="w-[10px] md:w-[12px] lg:w-[14px] h-2 md:h-2.5 lg:h-3 bg-[rgba(17,17,17,0.2)] rounded-full"></div>
              <div className="w-[10px] md:w-[12px] lg:w-[14px] h-2 md:h-2.5 lg:h-3 bg-[rgba(17,17,17,0.2)] rounded-full"></div>
              <div className="w-[50px] md:w-[60px] lg:w-[70px] h-2 md:h-2.5 lg:h-3 bg-[#111111] rounded-full"></div>
            </div>

            {/* Action Button - Only Continue button, no Skip */}
            <div className="flex">
              <button
                onClick={handleContinue}
                className="w-full h-[58px] md:h-[64px] lg:h-[70px] flex items-center justify-center bg-[#111111] rounded-full shadow-[0px_3px_32px_-1px_rgba(0,0,0,0.15)] hover:bg-[#333333] transition-all active:scale-[0.98]"
              >
                <span className="text-[16px] md:text-[18px] lg:text-[20px] font-semibold leading-[22px] md:leading-[24px] lg:leading-[26px] text-white font-[Parkinsans]">
                  Continue
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}