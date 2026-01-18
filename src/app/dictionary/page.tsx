'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Book, ArrowLeft, Star } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { SearchBar } from '@/components/ui/SearchBar';
import { WordCard } from '@/components/ui/WordCard';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';
import { MyCommunityTag } from '@/components/ui/MyCommunityTag';

interface DictionaryWord {
  id: string;
  yorubaWord: string;
  englishWord: string;
  definition: string;
  context?: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  isFavorite: boolean;
  usage: number;
}

export default function DictionaryPage() {
  const router = useRouter();
  const { appUser, isLoading: authLoading, userNeoCommunity } = useAuth();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [words, setWords] = useState<DictionaryWord[]>([]);

  useEffect(() => {
    // Wait for auth check to complete
    if (authLoading) return;

    if (!appUser) {
      router.push('/signin');
      return;
    }

    loadDictionaryWords();
    setLoading(false);
  }, [router, appUser, authLoading]);

  const loadDictionaryWords = () => {
    // Mock dictionary data
    const mockWords: DictionaryWord[] = [
      {
        id: '1',
        yorubaWord: 'Alafia',
        englishWord: 'Peace',
        definition: 'A state of tranquility or quiet; freedom from disturbance',
        context: 'Alafia ni ọrọ to dara ju (Peace is the best thing)',
        category: 'emotions',
        difficulty: 'beginner',
        isFavorite: true,
        usage: 245,
      },
      {
        id: '2',
        yorubaWord: 'Ọgbọn',
        englishWord: 'Wisdom',
        definition:
          'The quality of having experience, knowledge, and good judgment',
        context: 'Ọgbọn ju agbara lọ (Wisdom is better than strength)',
        category: 'abstract',
        difficulty: 'intermediate',
        isFavorite: false,
        usage: 189,
      },
      {
        id: '3',
        yorubaWord: 'Lẹwa',
        englishWord: 'Beautiful',
        definition: 'Having beauty; aesthetically pleasing',
        context:
          'Mo ri obirin lẹwa kan ni oja (I saw a beautiful woman at the market)',
        category: 'appearance',
        difficulty: 'beginner',
        isFavorite: true,
        usage: 312,
      },
      {
        id: '4',
        yorubaWord: 'Ireti',
        englishWord: 'Hope',
        definition:
          'A feeling of expectation and desire for a certain thing to happen',
        category: 'emotions',
        difficulty: 'beginner',
        isFavorite: false,
        usage: 156,
      },
      {
        id: '5',
        yorubaWord: 'Àgbára',
        englishWord: 'Power',
        definition: 'The ability to do something or act in a particular way',
        context: 'Àgbára wa ni ọwọ Ọlọrun (Power belongs to God)',
        category: 'abstract',
        difficulty: 'intermediate',
        isFavorite: false,
        usage: 203,
      },
      {
        id: '6',
        yorubaWord: 'Ayọ',
        englishWord: 'Joy',
        definition: 'A feeling of great pleasure and happiness',
        context: 'Ayọ mi po (My joy is abundant)',
        category: 'emotions',
        difficulty: 'beginner',
        isFavorite: true,
        usage: 278,
      },
    ];
    setWords(mockWords);
  };

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

  const categories = [
    { id: 'all', label: 'All Words', count: words.length },
    {
      id: 'emotions',
      label: 'Emotions',
      count: words.filter(w => w.category === 'emotions').length,
    },
    {
      id: 'abstract',
      label: 'Abstract',
      count: words.filter(w => w.category === 'abstract').length,
    },
    {
      id: 'appearance',
      label: 'Appearance',
      count: words.filter(w => w.category === 'appearance').length,
    },
  ];

  const filteredWords = words
    .filter(word => {
      const matchesSearch =
        searchQuery === '' ||
        word.yorubaWord.toLowerCase().includes(searchQuery.toLowerCase()) ||
        word.englishWord.toLowerCase().includes(searchQuery.toLowerCase()) ||
        word.definition.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'all' || word.category === selectedCategory;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      // Sort by usage (most used first), then alphabetically
      if (a.usage !== b.usage) return b.usage - a.usage;
      return a.yorubaWord.localeCompare(b.yorubaWord);
    });

  const handleGoBack = () => {
    router.push('/home');
  };

  const handleToggleFavorite = (wordId: string) => {
    setWords(prev =>
      prev.map(word =>
        word.id === wordId ? { ...word, isFavorite: !word.isFavorite } : word
      )
    );
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-neutral-100 text-neutral-800';
    }
  };

  return (
    <Layout variant="home">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
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
            Dictionary
          </h1>
          <div className="md:w-20">
            <MyCommunityTag
              userNeoCommunity={userNeoCommunity}
              user={appUser}
            />
          </div>{' '}
          {/* Spacer for centering */}
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-6 md:space-y-8 lg:space-y-10 pb-20 md:pb-8">
          {/* Header Card with Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl md:rounded-[2rem] lg:rounded-[2.5rem] border border-neutral-100 shadow-soft p-6 md:p-8 lg:p-10 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-3 md:gap-4 lg:gap-5 mb-4 md:mb-6 lg:mb-8">
              <div className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-purple-100 rounded-full md:rounded-2xl lg:rounded-3xl flex items-center justify-center">
                <Book className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-purple-600" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-neutral-950">
                  Yoruba Dictionary
                </h2>
                <p className="text-neutral-600 text-sm md:text-base lg:text-lg">
                  {filteredWords.length} word
                  {filteredWords.length !== 1 ? 's' : ''} available
                </p>
              </div>
            </div>

            {/* Search Bar */}
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search words, meanings, or definitions..."
              onClear={() => setSearchQuery('')}
              className="mb-4 md:mb-6 lg:mb-8"
            />

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 md:gap-3">
              {categories.map(category => (
                <Button
                  key={category.id}
                  variant={
                    selectedCategory === category.id ? 'primary' : 'outline'
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="h-8 md:h-10 lg:h-12 px-3 md:px-4 lg:px-5 text-xs md:text-sm lg:text-base hover:scale-105 active:scale-95 transition-transform"
                >
                  {category.label} ({category.count})
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Words List - Responsive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {filteredWords.map((word, index) => (
              <motion.div
                key={word.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.03 }}
                className="bg-white rounded-3xl md:rounded-[2rem] lg:rounded-[2.5rem] border border-neutral-100 shadow-soft overflow-hidden hover:shadow-lg transition-all hover:scale-[1.02]"
              >
                <div className="p-6 md:p-8">
                  {/* Header with favorite and difficulty */}
                  <div className="flex items-center justify-between mb-4 md:mb-6">
                    <div className="flex items-center gap-2 md:gap-3">
                      <div
                        className={`px-2 md:px-3 lg:px-4 py-1 md:py-1.5 lg:py-2 rounded-full text-xs md:text-sm lg:text-base font-medium ${getDifficultyColor(word.difficulty)}`}
                      >
                        {word.difficulty}
                      </div>
                      <div className="px-2 md:px-3 lg:px-4 py-1 md:py-1.5 lg:py-2 bg-neutral-100 text-neutral-600 rounded-full text-xs md:text-sm lg:text-base">
                        {word.usage} uses
                      </div>
                    </div>
                    <button
                      onClick={() => handleToggleFavorite(word.id)}
                      className={`p-2 md:p-3 lg:p-4 rounded-full transition-all hover:scale-110 active:scale-95 ${
                        word.isFavorite
                          ? 'text-yellow-500 bg-yellow-50 hover:bg-yellow-100'
                          : 'text-neutral-400 hover:text-yellow-500 hover:bg-neutral-50'
                      }`}
                    >
                      <Star
                        className={`w-5 h-5 md:w-6 md:h-6 ${word.isFavorite ? 'fill-current' : ''}`}
                      />
                    </button>
                  </div>

                  {/* Word Card */}
                  <WordCard
                    word={word.yorubaWord}
                    translation={word.englishWord}
                    definition={word.definition}
                    type="dictionary"
                    bgColor="bg-neutral-50"
                    borderColor="border-neutral-200"
                    tagColor="bg-purple-100 text-purple-800"
                    tagText={word.category}
                    className="mb-4 md:mb-6 hover:scale-[1.01] transition-transform"
                  />

                  {/* Context if available */}
                  {word.context && (
                    <div className="bg-purple-50 hover:bg-purple-100 transition-colors rounded-xl md:rounded-2xl p-4 md:p-5 lg:p-6">
                      <h4 className="text-sm md:text-base lg:text-lg font-medium text-purple-800 mb-2 md:mb-3">
                        Usage Example:
                      </h4>
                      <p className="text-sm md:text-base lg:text-lg text-purple-700 italic leading-relaxed">
                        &quot;{word.context}&quot;
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty state */}
          {filteredWords.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl md:rounded-[2rem] lg:rounded-[2.5rem] border border-neutral-100 shadow-soft p-8 md:p-10 lg:p-12 text-center col-span-full"
            >
              <Book className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 text-neutral-400 mx-auto mb-4 md:mb-6 lg:mb-8" />
              <h3 className="text-lg md:text-xl lg:text-2xl font-medium text-neutral-800 mb-2 md:mb-3 lg:mb-4">
                No Words Found
              </h3>
              <p className="text-neutral-600 text-sm md:text-base lg:text-lg max-w-md mx-auto mb-4 md:mb-6">
                Try adjusting your search or filter criteria
              </p>
              {searchQuery && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSearchQuery('')}
                  className="h-10 md:h-12 px-4 md:px-6 text-sm md:text-base hover:scale-105 active:scale-95 transition-transform"
                >
                  Clear Search
                </Button>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  );
}
