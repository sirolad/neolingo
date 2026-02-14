import { Layout } from '@/components/layout/Layout';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { RequestPageSkeleton } from '@/components/dictionary/RequestPageSkeleton';

export default function Loading() {
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
              {/* Community tag skeleton */}
              <div className="h-8 w-16 bg-neutral-200 dark:bg-neutral-800 rounded-full animate-pulse"></div>
            </div>
          </div>
          <p className="body-base text-neutral-500 dark:text-neutral-400 mb-8">
            Nominate a word in search for its Neos
          </p>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 md:px-6 lg:px-8 py-2">
          <RequestPageSkeleton />
        </div>
      </div>
    </Layout>
  );
}
