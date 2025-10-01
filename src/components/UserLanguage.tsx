'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface LanguageOption {
  id: string;
  name: string;
  flag: React.ReactNode;
}

export default function UserLanguage() {
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState<string>('english');

  const handleBack = () => {
    router.back();
  };

  const handleNext = () => {
    // Store selected language in localStorage or state management
    localStorage.setItem('selectedLanguage', selectedLanguage);
    router.push('/neo-language-setup');
  };

  const languages: LanguageOption[] = [
    {
      id: 'english',
      name: 'English',
      flag: (
        <div className="w-6 h-[18px] relative bg-white rounded-sm border border-neutral-200 overflow-hidden">
          {/* UK Flag simplified representation */}
          <div className="absolute inset-0 bg-[#012169]"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-[2px] bg-white"></div>
          </div>
          <div className="absolute inset-0 flex justify-center">
            <div className="w-[2px] h-full bg-white"></div>
          </div>
          <div className="absolute inset-0 bg-[#C8102E] opacity-60"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-[1px] bg-[#C8102E]"></div>
          </div>
          <div className="absolute inset-0 flex justify-center">
            <div className="w-[1px] h-full bg-[#C8102E]"></div>
          </div>
        </div>
      )
    },
    {
      id: 'french',
      name: 'French',
      flag: (
        <div className="w-6 h-[18px] relative rounded-sm border border-neutral-200 overflow-hidden">
          {/* French Flag */}
          <div className="absolute inset-0 flex">
            <div className="w-1/3 h-full bg-[#002654]"></div>
            <div className="w-1/3 h-full bg-white"></div>
            <div className="w-1/3 h-full bg-[#CE1126]"></div>
          </div>
        </div>
      )
    },
    {
      id: 'spanish',
      name: 'Spanish',
      flag: (
        <div className="w-6 h-[18px] relative rounded-sm border border-neutral-200 overflow-hidden">
          {/* Spanish Flag simplified */}
          <div className="absolute inset-0 flex flex-col">
            <div className="flex-1 bg-[#C60B1E]"></div>
            <div className="flex-[2] bg-[#FFC400] flex items-center justify-center">
              {/* Coat of arms simplified */}
              <div className="w-3 h-2 bg-[#C60B1E] rounded-sm"></div>
            </div>
            <div className="flex-1 bg-[#C60B1E]"></div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-[#F4F4F4] flex flex-col">
      
      {/* Back Button */}
      <div className="absolute top-12 left-5 z-10">
        <button
          onClick={handleBack}
          className="w-8 h-8 flex items-center justify-center rounded-full"
        >
          <svg width="20" height="10" viewBox="0 0 20 10" fill="none">
            <path d="M20 5H2M2 5L6 1M2 5L6 9" stroke="#292929" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col px-6 pt-16 pb-6">
        <div className="flex-1 flex flex-col justify-center">
          
          {/* Content Card */}
          <div className="bg-white rounded-3xl border border-[#EFEFEF] p-6 mx-auto w-full max-w-md">
            
            {/* Header */}
            <div className="text-center mb-8">
              {/* Progress Indicators */}
              <div className="flex justify-center items-center space-x-2 mb-6">
                <div className="w-16 h-1 bg-[#111111] rounded-full"></div>
                <div className="w-16 h-1 bg-[#D9D9D9] rounded-full"></div>
                <div className="w-16 h-1 bg-[#D9D9D9] rounded-full"></div>
              </div>

              <h1 className="text-[24px] font-medium leading-[29px] text-[#292929] font-[Parkinsans] mb-2">
                Set Up Your Profile
              </h1>
              <p className="text-[14px] font-normal leading-[14px] text-[#656565] font-[Metropolis]">
                Choose your language
              </p>
            </div>

            {/* Language Options */}
            <div className="space-y-4 mb-8">
              {languages.map((language) => (
                <button
                  key={language.id}
                  onClick={() => setSelectedLanguage(language.id)}
                  className={`w-full p-4 rounded-xl border flex items-center justify-between transition-colors ${
                    selectedLanguage === language.id
                      ? 'bg-white border-[rgba(17,17,17,0.15)]'
                      : 'bg-white border-[rgba(17,17,17,0.15)]'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {language.flag}
                    <span className="text-[14px] font-normal leading-[20px] text-[#111111] font-[Parkinsans]">
                      {language.name}
                    </span>
                  </div>
                  
                  {/* Radio Button */}
                  <div className="flex items-center">
                    <div className={`w-[22px] h-[22px] rounded-full border-[1.5px] flex items-center justify-center ${
                      selectedLanguage === language.id
                        ? 'border-[#111111]'
                        : 'border-[rgba(17,17,17,0.3)]'
                    }`}>
                      {selectedLanguage === language.id && (
                        <div className="w-[10px] h-[10px] bg-[#111111] rounded-full"></div>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Next Button */}
        <div className="pt-8">
          <button
            onClick={handleNext}
            className="w-full h-[58px] flex items-center justify-center bg-[#111111] rounded-full shadow-[0px_3px_32px_-1px_rgba(0,0,0,0.15)]"
          >
            <span className="text-[16px] font-semibold leading-[22px] text-white font-[Parkinsans]">
              Next
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}