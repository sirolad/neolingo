'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ReactCountryFlag from 'react-country-flag';
import { toast } from 'sonner';
import { ChevronLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import {
  getUserLanguageAndCommunity,
  listLanguages,
  setMyLanguage,
} from '@/actions/language';

interface LanguageOption {
  id: number;
  name: string;
  is_supported: boolean;
  icon: string;
}

export default function UserLanguage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<number | null>(null);
  const [languages, setLanguages] = useState<LanguageOption[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.id) {
      setLanguages([]);
      setSelectedLanguage(null);
      return;
    }

    const fetchData = async () => {
      try {
        const [languagesResult, userLanguageResult] = await Promise.all([
          listLanguages(),
          getUserLanguageAndCommunity(user.id),
        ]);

        setLanguages(languagesResult?.data || []);
        setSelectedLanguage(userLanguageResult?.extra?.languageId ?? null);
      } catch (error) {
        console.error('Failed to fetch languages or user language:', error);
      }
    };

    fetchData();
  }, [user?.id]);

  const handleBack = () => {
    router.back();
  };

  const handleNext = async () => {
    setLoading(true);
    const supportedLanguages = languages.filter(lang => lang.is_supported);

    if (!selectedLanguage) {
      setLoading(false);
      toast.error('Please select a Language to proceed.');
      return;
    } else if (!supportedLanguages.some(lang => lang.id === selectedLanguage)) {
      setLoading(false);
      toast.error('Oops! Selected language is not supported yet.');
      return;
    }

    try {
      const selected = languages.find(lang => lang.id === selectedLanguage);
      await setMyLanguage(selectedLanguage);
      toast.success(`Language set to ${selected?.name}`);
      router.push('/neo-language-setup');
    } catch (err) {
      console.error(err);
      toast.error('An error occurred while setting Language.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      {/* Back Button */}
      <div className="absolute top-12 left-5 z-10">
        <button
          onClick={handleBack}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-neutral-200 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-neutral-800" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col px-6 pt-16 pb-6">
        <div className="flex-1 flex flex-col justify-center">
          {/* Content Card */}
          <div className="bg-white rounded-3xl border border-neutral-200 p-6 mx-auto w-full max-w-md">
            {/* Header */}
            <div className="text-center mb-8">
              {/* Progress Indicators */}
              <div className="flex justify-center items-center space-x-2 mb-6">
                <div className="w-16 h-1 bg-primary rounded-full"></div>
                <div className="w-16 h-1 bg-neutral-300 rounded-full"></div>
              </div>

              <h1 className="text-2xl font-medium leading-[29px] text-neutral-800 font-[Parkinsans] mb-2">
                Set Up Your Profile
              </h1>
              <p className="text-sm font-normal leading-[14px] text-neutral-500 font-[Metropolis]">
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
                      ? 'bg-white border-primary/15 ring-1 ring-primary/5'
                      : 'bg-white border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <ReactCountryFlag
                      countryCode={language.icon}
                      svg
                      className="w-6 h-6"
                    />
                    <span className="text-sm font-normal leading-[20px] text-primary font-[Parkinsans]">
                      {language.name}
                    </span>
                  </div>

                  {/* Radio Button */}
                  <div className="flex items-center">
                    <div
                      className={`w-[22px] h-[22px] rounded-full border-[1.5px] flex items-center justify-center ${
                        selectedLanguage === language.id
                          ? 'border-primary'
                          : 'border-primary/30'
                      }`}
                    >
                      {selectedLanguage === language.id && (
                        <div className="w-[10px] h-[10px] bg-primary rounded-full"></div>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Next Button */}
        <div className="pt-8 flex justify-center w-full">
          <Button
            onClick={handleNext}
            loading={loading}
            className="w-full max-w-md h-[58px] rounded-full text-base font-semibold font-[Parkinsans]"
            variant="primary"
          >
            {loading ? 'Setting Language...' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
}
