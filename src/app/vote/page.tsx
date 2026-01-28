'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Vote, ArrowLeft, RefreshCcwDot } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { MyCommunityTag } from '@/components/ui/MyCommunityTag';
import { WordOfTheDay } from '@/components/ui/WordOfTheDay';
import AudioPlayer from '@/components/AudioPlayer';
import { Button } from '@/components/ui/Button';

interface ComunitySuggestion {
  id: string;
  communityWord: string;
  audioUrl?: string;
  votes: number;
}

export default function VotePage() {
  const router = useRouter();
  const { appUser, isLoading: authLoading, userNeoCommunity } = useAuth();
  const [loading, setLoading] = useState(true);
  // const [refreshing, setRefreshing] = useState(false);
  const [suggestions, setSuggestions] = useState<ComunitySuggestion[]>([]);
  const [myVotes, setMyVotes] = useState<string[]>(['2']);
  const [currentWord, setCurrentWord] = useState<string>('Tripod');

  useEffect(() => {
    if (authLoading) return;

    if (!appUser) {
      router.push('/signin');
      return;
    }

    loadSuggestions();
    setLoading(false);
    setMyVotes(['2']); // Mock: user has voted for suggestion with id '2'
    setCurrentWord('Tripod');
  }, [router, appUser, authLoading]);

  const loadSuggestions = () => {
    // Mock data for word suggestions
    const mockSuggestions: ComunitySuggestion[] = [
      {
        id: '1',
        communityWord: 'Apo elese meta',
        audioUrl: '/audio/short-11-237304.mp3',
        votes: 5,
      },
      {
        id: '2',
        communityWord: 'Igi meta',
        audioUrl: '/audio/short-11-237304.mp3',
        votes: 3,
      },
      {
        id: '3',
        communityWord: 'Aga elese meta',
        audioUrl: '/audio/short-11-237304.mp3',
        votes: 4,
      },
      {
        id: '4',
        communityWord: 'itile meta',
        audioUrl: '/audio/short-11-237304.mp3',
        votes: 6,
      },
    ];
    setSuggestions(mockSuggestions);
    console.log('currentWord:', currentWord);
  };

  if (loading) {
    return (
      <Layout variant="home">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-neutral-600">Loading...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (loading || authLoading) {
    return (
      <Layout variant="home">
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

  const handleGoBack = () => {
    router.push('/home');
  };

  const sortedSuggestions = [...suggestions].sort((a, b) => b.votes - a.votes);

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
            Voting Lounge
          </h1>
          {/* <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="p-2 md:p-3 lg:p-4 rounded-full hover:bg-neutral-100 transition-colors active:scale-95"
          >
            <RefreshCcw
              className={`w-5 h-5 md:w-6 md:h-6 text-neutral-600 ${refreshing ? 'animate-spin' : ''}`}
            />
          </button> */}
          <div className="md:w-20">
            <MyCommunityTag
              userNeoCommunity={userNeoCommunity}
              user={appUser}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-6 md:space-y-8 lg:space-y-10 pb-20 md:pb-8">
          {/* Header Card */}
          <WordOfTheDay
            word="Tripod"
            definition="A three-legged stand or support, often used to hold a camera or other device steady."
            partOfSpeech="noun"
          />

          {/* Suggestions List - Responsive Grid */}
          <div className="bg-white rounded-3xl md:rounded-[2rem] lg:rounded-[2.5rem] border border-neutral-100 shadow-soft overflow-hidden hover:shadow-lg transition-all hover:scale-[1.02]">
            {sortedSuggestions.map((suggestion, index) => (
              <motion.div
                key={suggestion.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="mx-6 md:mx-8 lg:mx-10 py-4 md:py-6 lg:py-8 border-b border-neutral-100 last:border-0"
              >
                <div>
                  <div className="flex items-center justify-between mb-4 md:mb-6">
                    <div className="flex items-center gap-2 text-sm md:text-base text-neutral-600">
                      <span>{(index + 1).toString().padStart(2, '0')}.</span>
                      <span>{suggestion.communityWord}</span>
                    </div>
                    <div className="flex items-center gap-1 md:gap-2 text-sm md:text-base px-2 md:px-3 py-1 md:py-1.5 ">
                      <AudioPlayer audioUrl={suggestion.audioUrl || ''} />
                      <Button
                        variant={
                          myVotes.find(id => id == suggestion.id)
                            ? 'default'
                            : 'outline'
                        }
                        size="sm"
                        onClick={() => {
                          // Handle delete action
                        }}
                        className={`rounded-full ${myVotes.find(id => id == suggestion.id) ? 'bg-[#cdffce] text-[#2da529]' : 'border border-primary-500 text-primary-500'}`}
                      >
                        {myVotes.find(id => id == suggestion.id)
                          ? 'Voted'
                          : 'Vote ' + '\u00A0'}
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty state if no suggestions */}
          {suggestions.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl md:rounded-[2rem] lg:rounded-[2.5rem] border border-neutral-100 shadow-soft p-8 md:p-10 lg:p-12 text-center col-span-full"
            >
              <Vote className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 text-neutral-400 mx-auto mb-4 md:mb-6 lg:mb-8" />
              <h3 className="text-lg md:text-xl lg:text-2xl font-medium text-neutral-800 mb-2 md:mb-3 lg:mb-4">
                No Suggestions Yet
              </h3>
              <p className="text-neutral-600 text-sm md:text-base lg:text-lg max-w-md mx-auto">
                Be the first to submit a word suggestion!
              </p>
            </motion.div>
          )}
          <div className="flex flex-row w-90 justify-center">
            <Button
              variant="outline"
              size="md"
              onClick={handleGoBack}
              className="mt-6 md:mt-8 lg:mt-10 h-12 md:h-14 lg:h-16 text-base md:text-lg font-medium rounded-full hover:scale-[1.02] active:scale-[0.98] transition-all w-50"
            >
              Load More <RefreshCcwDot className="ml-2 w-5 h-5 md:w-6 md:h-6" />
            </Button>
            <Button
              variant="outline"
              size="md"
              // onClick={handleSubmitAnother}
              className="mt-6 md:mt-8 lg:mt-10 ml-4 h-12 md:h-14 lg:h-16 text-base md:text-lg font-medium rounded-full md:rounded-full hover:scale-[1.02] active:scale-[0.98] transition-all w-50"
            >
              Next Word{' '}
              <ArrowLeft className="rotate-180 ml-2 w-5 h-5 md:w-6 md:h-6" />
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
