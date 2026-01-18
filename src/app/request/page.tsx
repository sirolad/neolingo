'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Layout } from '@/components/layout/Layout';
import { MyCommunityTag } from '@/components/ui/MyCommunityTag';
import { ArrowLeft } from 'lucide-react';

export default function RequestPage() {
  const router = useRouter();
  const { appUser, userNeoCommunity } = useAuth();

  const handleGoBack = () => {
    router.push('/home');
  };
  return (
    <Layout variant="home">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between py-4 md:py-6 lg:py-8">
          <button
            onClick={handleGoBack}
            className="inline-flex items-center text-neutral-950 hover:text-primary-800 transition-colors p-2 rounded-lg hover:bg-neutral-100"
          >
            <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 mr-2" />
            <span className="font-medium text-sm md:text-base">Back</span>
          </button>
          <h1 className="text-lg md:text-xl lg:text-2xl font-semibold text-neutral-950">
            New Request
          </h1>
          <div className="md:w-20">
            <MyCommunityTag
              userNeoCommunity={userNeoCommunity}
              user={appUser}
            />
          </div>
        </div>

        <div className="flex-1 space-y-6 md:space-y-8 lg:space-y-10 pb-20 md:pb-8"></div>
      </div>
    </Layout>
  );
}
