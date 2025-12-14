'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ReactCountryFlag from 'react-country-flag';
import { toast } from 'sonner';
import createClient from '@/lib/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { set } from 'zod';

interface LanguageOption {
  id: number;
  name: string;
  flag: React.ReactNode;
  icon: string;
}

export default function UserLanguage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<number | null>(null);
  const [languages, setLanguages] = useState<LanguageOption[]>([]);

  const supabase = createClient();

  useEffect(() => {
    // Fetch available languages from the backend API
    fetch('/api/languages')
      .then(res => res.json())
      .then(data => setLanguages(data.languages || []));
    fetch('/api/get-extra')
      .then(res => res.json())
      .then(data => {
        setSelectedLanguage(data.extra?.languageId || null);
      });
  }, []);

  const handleBack = () => {
    router.back();
  };

  const handleNext = () => {
    setLoading(true);
    const englishLanguage = languages.find(lang => lang.name === 'English');
    if (!selectedLanguage) {
      setLoading(false);
      toast.error('Please select a Language to proceed.');
      return;
    } else if (selectedLanguage !== englishLanguage?.id) {
      setLoading(false);
      toast.error('Language must be English to proceed.');
      return;
    }

    const selected = languages.find(lang => lang.id === selectedLanguage);
    fetch('/api/set-my-language', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${supabase.auth.getSession().then(({ data }) => data.session?.access_token)}`,
      },
      body: JSON.stringify({ languageId: selectedLanguage }),
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to set Language');
        }
        return res.json();
      })
      .then(() => {
        toast.success(`Language set to ${selected?.name}`);
        setLoading(false);
        router.push('/neo-language-setup');
      })
      .catch(err => {
        setLoading(false);
        console.error(err);
        toast.error('An error occurred while setting Language.');
      });
    // Store selected language in localStorage or state management
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
              {languages.map(language => (
                <button
                  key={language.id}
                  onClick={() => setSelectedLanguage(language.id)}
                  className={`w-full p-4 rounded-lg border flex items-center justify-between transition-colors ${
                    selectedLanguage === language.id
                      ? 'bg-white border-[rgba(17,17,17,0.15)]'
                      : 'bg-white border-[rgba(17,17,17,0.15)]'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <ReactCountryFlag
                      countryCode={language.icon}
                      svg
                      className="w-6 h-6"
                    />
                    <span className="text-[14px] font-normal leading-[20px] text-[#111111] font-[Parkinsans]">
                      {language.name}
                    </span>
                  </div>

                  {/* Radio Button */}
                  <div className="flex items-center">
                    <div
                      className={`w-[22px] h-[22px] rounded-full border-[1.5px] flex items-center justify-center ${
                        selectedLanguage === language.id
                          ? 'border-[#111111]'
                          : 'border-[rgba(17,17,17,0.3)]'
                      }`}
                    >
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
        <div className="pt-8 flex justify-center">
          <button
            onClick={handleNext}
            disabled={loading}
            className={
              loading
                ? 'w-full max-w-md h-[58px] flex items-center justify-center bg-[#888888] rounded-full shadow-[0px_3px_32px_-1px_rgba(0,0,0,0.15)]'
                : 'w-full max-w-md h-[58px] flex items-center justify-center bg-[#111111] rounded-full shadow-[0px_3px_32px_-1px_rgba(0,0,0,0.15)]'
            }
          >
            <span className="text-[16px] font-semibold leading-[22px] text-white font-[Parkinsans]">
              {loading ? 'Setting Language...' : 'Next'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
