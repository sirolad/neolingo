'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface NeoLanguageOption {
  id: string;
  name: string;
  description: string;
  color: string;
}

export default function NeoLanguage() {
  const router = useRouter();
  const [selectedNeoLanguage, setSelectedNeoLanguage] = useState<string>('gen-z');

  const handleBack = () => {
    router.back();
  };

  const handleNext = () => {
    // Store selected neo language in localStorage or state management
    localStorage.setItem('selectedNeoLanguage', selectedNeoLanguage);
    router.push('/home');
  };

  const neoLanguages: NeoLanguageOption[] = [
    {
      id: 'gen-z',
      name: 'Gen Z',
      description: 'Modern slang and internet culture',
      color: '#FF6B6B'
    },
    {
      id: 'urban',
      name: 'Urban',
      description: 'Street culture and contemporary expressions',
      color: '#4ECDC4'
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Business and corporate terminology',
      color: '#45B7D1'
    },
    {
      id: 'gaming',
      name: 'Gaming',
      description: 'Video game culture and esports',
      color: '#96CEB4'
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
                <div className="w-16 h-1 bg-[#111111] rounded-full"></div>
                <div className="w-16 h-1 bg-[#D9D9D9] rounded-full"></div>
              </div>

              <h1 className="text-[24px] font-medium leading-[29px] text-[#292929] font-[Parkinsans] mb-2">
                Choose Your Neo Language
              </h1>
              <p className="text-[14px] font-normal leading-[14px] text-[#656565] font-[Metropolis]">
                Select the style of language you want to learn
              </p>
            </div>

            {/* Neo Language Options */}
            <div className="space-y-4 mb-8">
              {neoLanguages.map((neoLanguage) => (
                <button
                  key={neoLanguage.id}
                  onClick={() => setSelectedNeoLanguage(neoLanguage.id)}
                  className={`w-full p-4 rounded-xl border flex items-center justify-between transition-colors ${
                    selectedNeoLanguage === neoLanguage.id
                      ? 'bg-white border-[rgba(17,17,17,0.15)]'
                      : 'bg-white border-[rgba(17,17,17,0.15)]'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-6 h-6 rounded-full"
                      style={{ backgroundColor: neoLanguage.color }}
                    ></div>
                    <div className="text-left">
                      <div className="text-[14px] font-medium leading-[20px] text-[#111111] font-[Parkinsans]">
                        {neoLanguage.name}
                      </div>
                      <div className="text-[12px] font-normal leading-[16px] text-[#656565] font-[Metropolis]">
                        {neoLanguage.description}
                      </div>
                    </div>
                  </div>
                  
                  {/* Radio Button */}
                  <div className="flex items-center">
                    <div className={`w-[22px] h-[22px] rounded-full border-[1.5px] flex items-center justify-center ${
                      selectedNeoLanguage === neoLanguage.id
                        ? 'border-[#111111]'
                        : 'border-[rgba(17,17,17,0.3)]'
                    }`}>
                      {selectedNeoLanguage === neoLanguage.id && (
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