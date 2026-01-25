'use client';

import React, { useEffect, useState } from 'react';
import {
  getSourceLanguages,
  getTargetLanguagesForDict,
  getPartsOfSpeech,
  getUserProfileForRequest,
  getAllDomains,
} from '@/actions/dictionary';
import { RequestForm } from '@/components/dictionary/RequestForm';
import { Layout } from '@/components/layout/Layout';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

interface Language {
  id: number;
  name: string;
}

export default function RequestNeoPage() {
  const { appUser, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [sourceLanguages, setSourceLanguages] = useState<Language[]>([]);
  const [targetLanguages, setTargetLanguages] = useState<Language[]>([]);
  const [partsOfSpeech, setPartsOfSpeech] = useState<
    Array<{ id: number; name: string; code: string }>
  >([]);
  const [userTargetLanguages, setUserTargetLanguages] = useState<Language[]>(
    []
  );
  const [availableDomains, setAvailableDomains] = useState<
    Array<{ id: number; name: string }>
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;

    if (!appUser) {
      router.push('/signin');
      return;
    }

    loadPageData();
  }, [appUser, authLoading, router]);

  const loadPageData = async () => {
    try {
      const [srcLangs, tgtLangs, pos, userProfile, domains] = await Promise.all(
        [
          getSourceLanguages(),
          getTargetLanguagesForDict(),
          getPartsOfSpeech(),
          appUser?.id
            ? getUserProfileForRequest(appUser.id)
            : Promise.resolve(null),
          getAllDomains(),
        ]
      );

      setSourceLanguages(srcLangs);
      setTargetLanguages(tgtLangs);
      setPartsOfSpeech(pos);
      setAvailableDomains(domains);

      if (
        userProfile?.targetLanguages &&
        userProfile.targetLanguages.length > 0
      ) {
        const userLangs = userProfile.targetLanguages.map(utl => ({
          id: utl.language.id,
          name: utl.language.name,
        }));
        setUserTargetLanguages(userLangs);
      }
    } catch (error) {
      console.error('Failed to load page data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || authLoading) {
    return (
      <Layout variant="fullbleed">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-neutral-600">Loading...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!appUser) {
    return null;
  }

  return (
    <Layout variant="fullbleed">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="px-4 md:px-6 lg:px-8 pt-16 md:pt-6 lg:pt-8 w-full max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <Link
              href="/dictionary"
              className="inline-flex items-center text-neutral-950 hover:text-primary-800 transition-colors p-2 rounded-lg hover:bg-neutral-100 -ml-2"
            >
              <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
            </Link>
            <h1 className="text-2xl text-neutral-900 px-16">Request A Neo</h1>
          </div>
          <p className="text-neutral-500 mb-8 ml-4">
            Nominate a word in search for its Neos
          </p>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 md:px-6 lg:px-8 py-2">
          {/* Form Container - Card only contains form fields, button outside */}
          <div className="w-full max-w-2xl space-y-4">
            <div className="bg-white rounded-3xl p-6 md:p-10 shadow-soft border border-neutral-100">
              <RequestForm
                partsOfSpeech={partsOfSpeech}
                sourceLanguages={sourceLanguages}
                targetLanguages={targetLanguages}
                showButton={false}
                userTargetLanguages={userTargetLanguages}
                availableDomains={availableDomains}
              />
            </div>
            <Button
              form="request-form"
              type="submit"
              variant="primary"
              className="w-full h-12 text-base my-12 font-semibold rounded-full"
            >
              Submit Request
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
