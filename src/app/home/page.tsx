'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCcw } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import createClient from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { CtaCard } from '@/components/ui/WordCtaCard';
import { MyCommunityTag } from '@/components/ui/MyCommunityTag';

interface WordCard {
  id: string;
  word: string;
  type: 'suggestion' | 'voting';
  bgColor: string;
  borderColor: string;
  tagColor: string;
}

export default function HomePage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const supabase = createClient();
  const { appUser, logout, userRole, userNeoCommunity } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const user = appUser;
  const router = useRouter();

  const wordCards: WordCard[] = [
    {
      id: '1',
      word: 'Hydrogen',
      type: 'suggestion',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      tagColor: 'bg-orange-100 text-orange-800',
    },
    {
      id: '2',
      word: 'Tripod',
      type: 'voting',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      tagColor: 'bg-blue-100 text-blue-800',
    },
  ];

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  // const handleLogout = () => {
  //   logout();
  // };

  const handleCta = (route: string) => {
    router.push(route);
  };

  return (
    <ProtectedRoute>
      <Layout variant="home">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          {/* User Greeting Header */}
          <div className="flex items-center justify-between py-4 md:py-6 lg:py-8 align-middle">
            <div className="flex items-center space-x-28 md:space-x-4">
              <div className="hidden lg:block">
                <h1 className="text-lg md:text-xl lg:text-2xl font-semibold text-neutral-950 hidden lg:block">
                  Hi {user?.name || 'User'}!
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-4 lg:hidden justify-between w-full">
              <div className="">
                <span className="text-lg btn-sm">
                  Hi, {user?.name || 'User'}
                </span>
                <button className="px-1.5 py-0.5 text-[10px] rounded-[0.25rem] bg-[#9c62d9] border border-neutral-200 ml-2 text-neutral-50">
                  {userRole}
                </button>
              </div>
              <MyCommunityTag userNeoCommunity={userNeoCommunity} user={user} />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 pb-20 md:pb-8">
            {/* Desktop Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
              {/* Left Column - Main Cards */}
              <div className="space-y-6 md:space-y-8">
                {/* Request Card */}
                <CtaCard
                  title="Request a Neo"
                  subTitle="Got a word in your mind?"
                  word="Ask the community to mine Neos"
                  ctatext="Word on your mind"
                  variant="request"
                  onHandleClick={() => handleCta('/request')}
                />
                {/* Suggestion Card */}
                <CtaCard
                  title="Make Your Suggestion"
                  subTitle="Suggest a yoruba word for the word of the day!"
                  word={wordCards[0].word}
                  ctatext="Word of the day"
                  variant="suggest"
                  onHandleClick={() => handleCta('/suggest')}
                />
                {/* Voting Card */}
                <CtaCard
                  title="Vote for today's best word"
                  subTitle="Vote for the top ranked suggested words"
                  word={wordCards[1].word}
                  ctatext="Word of the day"
                  variant="vote"
                  onHandleClick={() => handleCta('/vote')}
                />
              </div>

              {/* Right Column - Leaderboard (Desktop) or Third Card (Mobile) */}
              <div className="lg:sticky lg:top-8 lg:h-fit">
                {/* Leaderboard Card */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.15 }}
                  className="bg-white rounded-3xl md:rounded-[2rem] lg:rounded-[2.5rem] border border-neutral-100 shadow-soft overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {/* Card Header */}
                  <div className="p-6 md:p-8 lg:p-10">
                    <div className="flex items-center justify-between mb-4 md:mb-6 lg:mb-8">
                      <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-neutral-950">
                        Leaderboard
                      </h2>
                      <button
                        onClick={handleRefresh}
                        disabled={refreshing}
                        className="p-2 md:p-3 lg:p-4 rounded-full hover:bg-neutral-100 transition-colors active:scale-95"
                      >
                        <RefreshCcw
                          className={`w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-neutral-600 ${refreshing ? 'animate-spin' : ''}`}
                        />
                      </button>
                    </div>

                    {/* Suggested Word Tag */}
                    <div className="inline-flex items-center gap-2 md:gap-3 lg:gap-4 px-4 md:px-6 lg:px-8 py-2 md:py-3 lg:py-4 bg-primary-100 border border-primary-200 rounded-full hover:bg-primary-200 transition-colors">
                      <span className="text-xs md:text-sm lg:text-base font-medium text-primary-800">
                        Suggested word
                      </span>
                      <RefreshCcw className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 text-primary-600" />
                    </div>

                    {/* Additional Desktop Content */}
                    <div className="hidden lg:block mt-8 space-y-6">
                      {/* Quick Stats */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-2xl border border-orange-200">
                          <div className="text-orange-600 text-2xl font-bold">
                            24
                          </div>
                          <div className="text-orange-800 text-sm font-medium">
                            Suggestions Today
                          </div>
                        </div>
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-2xl border border-blue-200">
                          <div className="text-blue-600 text-2xl font-bold">
                            156
                          </div>
                          <div className="text-blue-800 text-sm font-medium">
                            Votes Cast
                          </div>
                        </div>
                      </div>

                      {/* Recent Activity */}
                      <div className="space-y-3">
                        <h3 className="text-lg font-semibold text-neutral-950">
                          Recent Activity
                        </h3>
                        <div className="space-y-2">
                          <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-xl">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-sm text-neutral-700">
                              New word suggestion received
                            </span>
                          </div>
                          <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-xl">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="text-sm text-neutral-700">
                              5 votes cast on &ldquo;Technology&rdquo;
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
