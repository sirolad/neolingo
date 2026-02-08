'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function BecomeCuratorPage() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleTakeTest = () => {
    // TODO: Navigate to curator test page
    router.push('/curator-test');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="px-4 py-4 lg:px-8 lg:py-6">
        <button
          onClick={handleBack}
          className="p-2 -ml-2 text-neutral-800 hover:bg-neutral-100 rounded-full transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 pb-8 lg:pb-16">
        <div className="w-full max-w-md lg:max-w-lg flex flex-col items-center">
          {/* Illustration */}
          <div className="relative w-64 h-64 lg:w-80 lg:h-80 mb-8 lg:mb-12">
            <Image
              src="/assets/dictionary/curator.png"
              alt="Become a Curator illustration"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Text Content */}
          <div className="text-center mb-8 lg:mb-12">
            <h1 className="text-2xl lg:text-3xl font-display font-semibold text-neutral-950 mb-2">
              Become a Curator!
            </h1>
            <p className="text-neutral-500 text-base lg:text-lg">
              Suggest new words
            </p>
          </div>

          {/* CTA Button */}
          <Button
            onClick={handleTakeTest}
            className="w-full max-w-sm bg-neutral-950 hover:bg-neutral-800 text-white rounded-full h-14 lg:h-16 text-base lg:text-lg font-medium transition-colors"
          >
            Take the test
          </Button>
        </div>
      </main>
    </div>
  );
}
