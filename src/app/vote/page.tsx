'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Vote, ArrowLeft, TrendingUp } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { WordCard } from '@/components/ui/WordCard';
import { useAuth } from '@/contexts/AuthContext';
import { MyCommunityTag } from '@/components/ui/MyCommunityTag';

interface WordSuggestion {
  id: string;
  englishWord: string;
  yorubaWord: string;
  definition: string;
  context?: string;
  votes: number;
  submittedBy: string;
  timeAgo: string;
  userHasVoted: boolean;
}

export default function VotePage() {
  const router = useRouter();
  const { appUser, isLoading: authLoading, userNeoCommunity } = useAuth();
  const [loading, setLoading] = useState(true);
  // const [refreshing, setRefreshing] = useState(false);
  const [suggestions, setSuggestions] = useState<WordSuggestion[]>([]);

  useEffect(() => {
    if (authLoading) return;

    if (!appUser) {
      router.push('/signin');
      return;
    }

    loadSuggestions();
    setLoading(false);
  }, [router, appUser, authLoading]);

  const loadSuggestions = () => {
    // Mock data for word suggestions
    const mockSuggestions: WordSuggestion[] = [
      {
        id: '1',
        englishWord: 'Beautiful',
        yorubaWord: 'Lẹwa',
        definition: 'Having beauty; aesthetically pleasing',
        context:
          'Mo ri obirin lẹwa kan ni oja (I saw a beautiful woman at the market)',
        votes: 12,
        submittedBy: 'Adunni',
        timeAgo: '2 hours ago',
        userHasVoted: false,
      },
      {
        id: '2',
        englishWord: 'Wisdom',
        yorubaWord: 'Ọgbọn',
        definition:
          'The quality of having experience, knowledge, and good judgment',
        context: 'Ọgbọn ju agbara lọ (Wisdom is better than strength)',
        votes: 8,
        submittedBy: 'Femi',
        timeAgo: '5 hours ago',
        userHasVoted: true,
      },
      {
        id: '3',
        englishWord: 'Peace',
        yorubaWord: 'Alafia',
        definition: 'A state of tranquility or quiet; freedom from disturbance',
        context: 'Alafia ni ọrọ to dara ju (Peace is the best thing)',
        votes: 15,
        submittedBy: 'Kemi',
        timeAgo: '1 day ago',
        userHasVoted: false,
      },
      {
        id: '4',
        englishWord: 'Hope',
        yorubaWord: 'Ireti',
        definition:
          'A feeling of expectation and desire for a certain thing to happen',
        votes: 5,
        submittedBy: 'Tunde',
        timeAgo: '2 days ago',
        userHasVoted: false,
      },
    ];
    setSuggestions(mockSuggestions);
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

  const handleVote = (suggestionId: string) => {
    setSuggestions(prev =>
      prev.map(suggestion =>
        suggestion.id === suggestionId
          ? {
              ...suggestion,
              votes: suggestion.userHasVoted
                ? suggestion.votes - 1
                : suggestion.votes + 1,
              userHasVoted: !suggestion.userHasVoted,
            }
          : suggestion
      )
    );
  };

  // const handleRefresh = () => {
  //   setRefreshing(true);
  //   setTimeout(() => {
  //     loadSuggestions();
  //     setRefreshing(false);
  //   }, 1000);
  // };

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
            Vote
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl md:rounded-[2rem] lg:rounded-[2.5rem] border border-neutral-100 shadow-soft p-6 md:p-8 lg:p-10 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-3 md:gap-4 lg:gap-5 mb-4 md:mb-6">
              <div className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-blue-100 rounded-full md:rounded-2xl lg:rounded-3xl flex items-center justify-center">
                <Vote className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-neutral-950">
                  Vote for Word Suggestions
                </h2>
                <p className="text-neutral-600 text-sm md:text-base lg:text-lg">
                  Help decide which words make it into our dictionary
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 md:gap-3 text-sm md:text-base text-neutral-600">
              <TrendingUp className="w-4 h-4 md:w-5 md:h-5" />
              <span>Sorted by most votes</span>
            </div>
          </motion.div>

          {/* Suggestions List - Responsive Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
            {sortedSuggestions.map((suggestion, index) => (
              <motion.div
                key={suggestion.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-white rounded-3xl md:rounded-[2rem] lg:rounded-[2.5rem] border border-neutral-100 shadow-soft overflow-hidden hover:shadow-lg transition-all hover:scale-[1.02]"
              >
                <div className="p-6 md:p-8">
                  {/* Header with submission info */}
                  <div className="flex items-center justify-between mb-4 md:mb-6">
                    <div className="flex items-center gap-2 text-sm md:text-base text-neutral-600">
                      <span>
                        Suggested by{' '}
                        <strong className="text-neutral-800">
                          {suggestion.submittedBy}
                        </strong>
                      </span>
                      <span>•</span>
                      <span>{suggestion.timeAgo}</span>
                    </div>
                    <div className="flex items-center gap-1 md:gap-2 text-sm md:text-base text-neutral-500 bg-neutral-100 px-2 md:px-3 py-1 md:py-1.5 rounded-full">
                      <TrendingUp className="w-4 h-4 md:w-5 md:h-5" />
                      <span>#{index + 1}</span>
                    </div>
                  </div>

                  {/* Word Card */}
                  <WordCard
                    word={suggestion.yorubaWord}
                    translation={suggestion.englishWord}
                    definition={suggestion.definition}
                    type="voting"
                    bgColor={
                      suggestion.userHasVoted ? 'bg-blue-50' : 'bg-neutral-50'
                    }
                    borderColor={
                      suggestion.userHasVoted
                        ? 'border-blue-200'
                        : 'border-neutral-200'
                    }
                    tagColor="bg-blue-100 text-blue-800"
                    tagText="Word Suggestion"
                    votes={suggestion.votes}
                    onAction={() => handleVote(suggestion.id)}
                    actionText={suggestion.userHasVoted ? 'Voted' : 'Vote'}
                    actionIcon={<Vote className="w-4 h-4 md:w-5 md:h-5" />}
                    className="mb-4 md:mb-6 hover:scale-[1.01] transition-transform"
                  />

                  {/* Context if available */}
                  {suggestion.context && (
                    <div className="bg-neutral-50 hover:bg-neutral-100 transition-colors rounded-xl md:rounded-2xl p-4 md:p-5 lg:p-6">
                      <h4 className="text-sm md:text-base font-medium text-neutral-800 mb-2 md:mb-3">
                        Usage Example:
                      </h4>
                      <p className="text-sm md:text-base text-neutral-600 italic leading-relaxed">
                        &quot;{suggestion.context}&quot;
                      </p>
                    </div>
                  )}
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
        </div>
      </div>
    </Layout>
  );
}
