'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  Vote,
  ArrowLeft,
  RefreshCcwDot,
  Recycle,
  Star,
  Wrench,
  TreePalmIcon,
  Brain,
  Circle,
} from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { MyCommunityTag } from '@/components/ui/MyCommunityTag';
import { WordOfTheDay } from '@/components/ui/WordOfTheDay';
import AudioPlayer from '@/components/AudioPlayer';
import { Button } from '@/components/ui/Button';
import { getTermNeos, getTerms } from '@/actions/curateNeo';

interface CommunitySuggestion {
  id: number;
  text: string;
  type: string;
  audioUrl?: string | null;
  vote: number;
  ratingCount: number;
  ratingScore: number;
}
interface Term {
  id: number;
  text: string;
  partOfSpeech: { name: string };
  concept: { gloss: string | null };
}

export default function VotePage() {
  const router = useRouter();
  const { appUser, isLoading: authLoading, userNeoCommunity } = useAuth();
  const [loading, setLoading] = useState(true);
  const [suggestions, setSuggestions] = useState<CommunitySuggestion[]>([]);
  const [myVotes, setMyVotes] = useState<number[]>([2]);
  const [term, setTerm] = useState<Term>({} as Term);

  useEffect(() => {
    if (authLoading) return;

    if (!appUser) {
      router.push('/signin');
      return;
    }
    setLoading(false);
    setMyVotes([20]); // Mock: user has voted for suggestion with id '2'
  }, [router, appUser, authLoading]);

  const loadSuggestions = () => {
    // Mock data for word suggestions
    const mockSuggestions: CommunitySuggestion[] = [
      {
        id: 1,
        text: 'Apo elese meta',
        type: 'popular',
        audioUrl: '/audio/short-11-237304.mp3',
        vote: 2,
        ratingCount: 3,
        ratingScore: 4.5,
      },
      {
        id: 2,
        text: 'Igi meta',
        type: 'adoptive',
        audioUrl: '/audio/short-11-237304.mp3',
        vote: 5,
        ratingCount: 2,
        ratingScore: 3.5,
      },
      {
        id: 3,
        text: 'Aga elese meta',
        type: 'functional',
        audioUrl: '/audio/short-11-237304.mp3',
        vote: 2,
        ratingCount: 4,
        ratingScore: 4.0,
      },
      {
        id: 4,
        text: 'itile meta',
        type: 'root',
        audioUrl: '/audio/short-11-237304.mp3',
        vote: 0,
        ratingCount: 1,
        ratingScore: 2.0,
      },
    ];
    setSuggestions(mockSuggestions);
  };

  useEffect(() => {
    const fetchTerms = async () => {
      if (userNeoCommunity != null) {
        let userNeoCommunityId: number;
        if (typeof userNeoCommunity.id === 'number') {
          userNeoCommunityId = userNeoCommunity.id;
        } else {
          userNeoCommunityId = parseInt(userNeoCommunity.id);
        }
        const fetchedTerms = await getTerms(userNeoCommunityId);

        if (fetchedTerms && fetchedTerms.length > 0) {
          setTerm(fetchedTerms[0]);
          const fetchNeo = await getTermNeos(fetchedTerms[0].id);
          if (fetchNeo != null && fetchNeo.length !== 0) {
            setSuggestions(fetchNeo);
          }
        } else {
          loadSuggestions();
        }
      } else {
        loadSuggestions();
      }
    };
    fetchTerms();
  }, [userNeoCommunity]);

  if (loading) {
    return (
      <Layout variant="home">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="body-base text-neutral-600 dark:text-neutral-400">
              Loading...
            </p>
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
            <p className="body-base text-neutral-600 dark:text-neutral-400">
              Loading...
            </p>
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

  const loadFreshSuggestions = () => {
    // This function can be expanded to fetch real suggestions from the backend
    setSuggestions([]);
  };

  const typeIcon = (type: string) => {
    switch (type) {
      case 'popular':
        return <Star className="text-neutral-600 dark:text-neutral-400" />;
      case 'adoptive':
        return <Recycle className="text-neutral-600 dark:text-neutral-400" />;
      case 'functional':
        return <Wrench className="text-neutral-600 dark:text-neutral-400" />;
      case 'root':
        return (
          <TreePalmIcon className="text-neutral-600 dark:text-neutral-400" />
        );
      case 'non-conforming':
      case 'creative':
        return <Brain className="text-neutral-600 dark:text-neutral-400" />;
      default:
        return <Circle className="text-neutral-600 dark:text-neutral-400" />;
    }
  };

  const sortedSuggestions = [...suggestions].sort(
    (a, b) => b.ratingScore - a.ratingScore
  );

  return (
    <Layout variant="home">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between py-4 md:py-6 lg:py-8">
          <button
            onClick={handleGoBack}
            className="inline-flex items-center text-neutral-950 dark:text-neutral-50 hover:text-primary-800 dark:hover:text-primary-200 transition-colors p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 mr-2" />
            <span className="body-small md:body-base font-medium hidden lg:block">
              Back
            </span>
          </button>
          <span className="heading-4 text-neutral-950 dark:text-neutral-50">
            Voting Lounge
          </span>
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
            word={term?.text || 'Loading...'}
            definition={term?.concept?.gloss || 'No definition available.'}
            partOfSpeech={term?.partOfSpeech?.name || 'noun'}
          />

          {/* Suggestions List - Responsive Grid */}
          <div className="bg-white dark:bg-neutral-900 rounded-3xl md:rounded-[2rem] lg:rounded-[2.5rem] border border-neutral-100 dark:border-neutral-800 shadow-soft overflow-hidden hover:shadow-lg transition-all hover:scale-[1.02]">
            {sortedSuggestions.map((suggestion, index) => (
              <motion.div
                key={suggestion.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="mx-6 md:mx-8 lg:mx-10 py-4 md:py-6 lg:py-8 border-b border-neutral-100 dark:border-neutral-800 last:border-0"
              >
                <div>
                  <div className="flex items-center justify-between mb-4 md:mb-6">
                    <div className="flex items-center gap-2 body-small md:body-base text-neutral-600 dark:text-neutral-400">
                      <span>{typeIcon(suggestion.type)}</span>
                      <span>{suggestion.text}</span>
                    </div>
                    <div className="flex items-center gap-1 md:gap-2 body-small md:body-base px-2 md:px-3 py-1 md:py-1.5">
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
              className="bg-white dark:bg-neutral-900 rounded-3xl md:rounded-[2rem] lg:rounded-[2.5rem] border border-neutral-100 dark:border-neutral-800 shadow-soft p-8 md:p-10 lg:p-12 text-center col-span-full"
            >
              <Vote className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 text-neutral-400 mx-auto mb-4 md:mb-6 lg:mb-8" />
              <h3 className="heading-4 lg:heading-3 text-neutral-800 dark:text-neutral-200 mb-2 md:mb-3 lg:mb-4">
                No Suggestions Yet
              </h3>
              <p className="body-small md:body-base lg:body-large text-neutral-600 dark:text-neutral-400 max-w-md mx-auto">
                Be the first to submit a word suggestion!
              </p>
            </motion.div>
          )}
          <div className="flex flex-row justify-center mt-6 md:mt-8 lg:mt-10">
            <div className="flex  gap-1 flex-row justify-center">
              <Button
                variant="outline"
                size="md"
                onClick={loadFreshSuggestions}
                className="rounded-full"
              >
                Load More{' '}
                <RefreshCcwDot className="ml-2 w-5 h-5 md:w-6 md:h-6" />
              </Button>
              <Button
                variant="outline"
                size="md"
                // onClick={handleSubmitAnother}
                className="ml-4 rounded-full"
              >
                Next Word{' '}
                <ArrowLeft className="rotate-180 ml-2 w-5 h-5 md:w-6 md:h-6" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
