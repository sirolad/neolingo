'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ReactCountryFlag from 'react-country-flag';
import { toast } from 'sonner';
import createClient from '@/lib/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface NeoLanguageOption {
  id: number;
  name: string;
  icon: string;
  neoCommunities: {
    id: number;
    name: string;
  }[];
}

export default function NeoLanguage() {
  const router = useRouter();
  const { userNeoCommunityId } = useAuth();
  const [selectedNeoLanguage, setSelectedNeoLanguage] = useState<number | null>(
    userNeoCommunityId
  );
  const [neoLanguages, setNeoLanguages] = useState<NeoLanguageOption[]>([]);
  const supabase = createClient();

  useEffect(() => {
    // Fetch available languages from the backend API
    fetch('/api/countries')
      .then(res => res.json())
      .then(data => {
        console.log('countries call ', data);
        setNeoLanguages(data.languages || []);
      });
  }, []);
  const handleBack = () => {
    router.back();
  };

  const handleNext = () => {
    const selectedLanguage = neoLanguages.find(
      lang => lang.id === selectedNeoLanguage
    );
    fetch('/api/set-my-neo-community', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${supabase.auth.getSession().then(({ data }) => data.session?.access_token)}`,
      },
      body: JSON.stringify({ neoCommunityId: selectedNeoLanguage }),
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to set Language');
        }
        return res.json();
      })
      .then(() => {
        toast.success(`Neo Community set to ${selectedLanguage?.name}`);
        router.push('/email-verification/1');
      })
      .catch(err => {
        console.error(err);
        toast.error('An error occurred while setting Neo Community.');
      });
  };

  return (
    <div className="min-h-screen bg-[#F4F4F4] flex flex-col">
      {/* Back Button */}
      <div className="absolute top-12 left-5 z-10">
        <button
          onClick={handleBack}
          className="w-8 h-8 flex items-center justify-center rounded-full"
        >
          <svg width="20" height="10" viewBox="0 0 20 10" fill="none">
            <path
              d="M20 5H2M2 5L6 1M2 5L6 9"
              stroke="#292929"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col px-6 pt-16 pb-6 ">
        <div className="flex-1 flex flex-col justify-center">
          {/* Content Card */}
          <div className="bg-white rounded-3xl border border-[#EFEFEF] p-6 mx-auto w-full max-w-md">
            {/* Header */}
            <div className="text-center mb-8">
              {/* Progress Indicators */}
              <div className="flex justify-center items-center space-x-2 mb-6">
                <div className="w-16 h-1 bg-[#D9D9D9] rounded-full"></div>
                <div className="w-16 h-1 bg-[#111111] rounded-full"></div>
                <div className="w-16 h-1 bg-[#D9D9D9] rounded-full"></div>
              </div>

              <h1 className="text-[24px] font-medium leading-[29px] text-[#292929] font-[Parkinsans] mb-2">
                Choose Your NeoLingo Community
              </h1>
              <p className="text-[14px] font-normal leading-[14px] text-[#656565] font-[Metropolis]">
                Rep your mother tongue.
              </p>
            </div>

            {/* Neo Language Options */}
            <div className="flex flex-wrap gap-4 space-y-4 mb-8 justify-center">
              {neoLanguages.map(neoLanguage => (
                <div
                  key={neoLanguage.id}
                  className={`flex flex-col w-[47%]  p-4 rounded-xl border  justify-between transition-colors ${
                    selectedNeoLanguage === neoLanguage.id ||
                    userNeoCommunityId === neoLanguage.id
                      ? 'bg-white border-[rgba(17,17,17,0.15)]'
                      : 'bg-white border-[rgba(17,17,17,0.15)]'
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <ReactCountryFlag
                      countryCode={neoLanguage.icon}
                      svg
                      className="w-6 h-6"
                    />
                    <div className="text-left">
                      <div className="text-[14px] font-medium leading-[20px] text-[#111111] font-[Parkinsans]">
                        {neoLanguage.name}
                      </div>
                    </div>
                  </div>

                  {/* Radio Button */}
                  {neoLanguage.neoCommunities.map(community => (
                    <div
                      key={community.id}
                      className="flex items-center mb-2 justify-between"
                    >
                      <div className="text-[14px] font-normal leading-[20px] text-[#111111] font-[Metropolis]">
                        {community.name}
                      </div>
                      <div
                        onClick={() => setSelectedNeoLanguage(community.id)}
                        className="flex items-center"
                      >
                        <div
                          className={`w-[22px] h-[22px] rounded-full border-[1.5px] flex items-center justify-center ${
                            selectedNeoLanguage === community.id
                              ? 'border-[#111111]'
                              : 'border-[rgba(17,17,17,0.3)]'
                          }`}
                        >
                          {selectedNeoLanguage === community.id && (
                            <div className="w-[10px] h-[10px] bg-[#111111] rounded-full"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Next Button */}
        <div className="pt-8 flex justify-center">
          <button
            onClick={handleNext}
            className="w-full max-w-md h-[58px] flex items-center justify-center bg-[#111111] rounded-full shadow-[0px_3px_32px_-1px_rgba(0,0,0,0.15)]"
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
