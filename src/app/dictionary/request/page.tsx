import React from 'react';
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
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/supabase/server';
import { MyCommunityTag } from '@/components/ui/MyCommunityTag';

interface Language {
  id: number;
  name: string;
}

export default async function RequestNeoPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/signin');
  }

  // Pre-fetch all data on the server in parallel
  const [
    sourceLanguages,
    targetLanguages,
    partsOfSpeech,
    userProfile,
    domains,
  ] = await Promise.all([
    getSourceLanguages(),
    getTargetLanguagesForDict(),
    getPartsOfSpeech(),
    getUserProfileForRequest(user.id),
    getAllDomains(),
  ]);

  let userTargetLanguages: Language[] = [];

  if (userProfile?.targetLanguages && userProfile.targetLanguages.length > 0) {
    userTargetLanguages = userProfile.targetLanguages.map(utl => ({
      id: utl.language.id,
      name: utl.language.name,
    }));
  }

  return (
    <Layout variant="fullbleed">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="px-4 md:px-6 lg:px-8 pt-4 md:pt-6 lg:pt-8 w-full max-w-2xl mx-auto">
          <div className="flex items-center justify-between py-4 md:py-6 lg:py-8">
            <Link
              href="/dictionary"
              className="inline-flex items-center text-neutral-950 dark:text-neutral-50 hover:text-primary-800 dark:hover:text-primary-200 transition-colors p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 mr-2" />
              <span className="body-small md:body-base font-medium hidden lg:block">
                Back
              </span>
            </Link>
            <span className="heading-4 text-neutral-950 dark:text-neutral-50">
              Request A Neo
            </span>
            <div className="md:w-20">
              <MyCommunityTag
                userNeoCommunity={
                  userProfile?.targetLanguages?.[0]
                    ? {
                        id: userProfile.targetLanguages[0].language.id,
                        name: userProfile.targetLanguages[0].language.name,
                        short: userProfile.targetLanguages[0].language.short,
                        flagIcon: userProfile.targetLanguages[0].language.icon,
                      }
                    : null
                }
                user={{
                  name: userProfile?.name || null,
                  avatar: null,
                }}
              />
            </div>
          </div>
          <p className="body-base text-neutral-500 dark:text-neutral-400 mb-8">
            Nominate a word in search for its Neos
          </p>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 md:px-6 lg:px-8 py-2">
          {/* Form Container - Card only contains form fields, button outside */}
          <div className="w-full max-w-2xl space-y-4">
            <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 md:p-10 shadow-soft border border-neutral-100 dark:border-neutral-800">
              <RequestForm
                partsOfSpeech={partsOfSpeech}
                sourceLanguages={sourceLanguages}
                targetLanguages={targetLanguages}
                showButton={false}
                userTargetLanguages={userTargetLanguages}
                availableDomains={domains}
                userId={user.id}
              />
            </div>
            <Button
              form="request-form"
              type="submit"
              variant="primary"
              className="w-full h-12 body-base font-semibold my-12 rounded-full"
            >
              Submit Request
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
