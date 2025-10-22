'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Lightbulb, Vote, RefreshCcw } from 'lucide-react'
import { Layout } from '@/components/layout/Layout'
import { Button } from '@/components/ui/Button'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { useAuth } from '@/contexts/AuthContext'
import createClient from '@/lib/supabase/client'

interface WordCard {
  id: string
  word: string
  type: 'suggestion' | 'voting'
  bgColor: string
  borderColor: string
  tagColor: string
}

export default function HomePage() {
  const supabase = createClient()
  const { user, logout } = useAuth()
  const [refreshing, setRefreshing] = useState(false)

  const wordCards: WordCard[] = [
    {
      id: '1',
      word: 'Hydrogen',
      type: 'suggestion',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      tagColor: 'bg-orange-100 text-orange-800'
    },
    {
      id: '2',
      word: 'Tripod',
      type: 'voting',
      bgColor: 'bg-blue-50', 
      borderColor: 'border-blue-200',
      tagColor: 'bg-blue-100 text-blue-800'
    }
  ]

  const handleSuggest = (wordId: string) => {
    console.log('Suggest word:', wordId)
  }

  const handleVote = (wordId: string) => {
    console.log('Vote for word:', wordId)
  }

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 1000)
  }

  const handleLogout = () => {
    logout()
  }

  return (
    <ProtectedRoute>
      <Layout variant="home">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* User Greeting Header */}
        <div className="flex items-center justify-between py-4 md:py-6 lg:py-8">
          <div className="flex items-center space-x-3 md:space-x-4">
            <div className="text-2xl md:text-3xl lg:text-4xl">{user?.avatar}</div>
            <div>
              <h1 className="text-lg md:text-xl lg:text-2xl font-semibold text-neutral-950">
                Welcome back, {user?.name}!
              </h1>
              <p className="text-sm md:text-base lg:text-lg text-neutral-600">Ready to learn today?</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm md:text-base text-neutral-500 hover:text-neutral-700 transition-colors px-3 py-2 rounded-lg hover:bg-neutral-100"
          >
            Logout
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 pb-20 md:pb-8">
          {/* Desktop Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
            
            {/* Left Column - Main Cards */}
            <div className="space-y-6 md:space-y-8">
              {/* Word Suggestion Card */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl md:rounded-[2rem] lg:rounded-[2.5rem] border border-neutral-100 shadow-soft overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Card Header */}
                <div className="p-6 md:p-8 lg:p-10 pb-4 md:pb-6 lg:pb-8">
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-neutral-950 mb-1 md:mb-2">
                    Make Your Suggestion
                  </h2>
                  <p className="text-neutral-600 text-sm md:text-base lg:text-lg">
                    Suggest a yoruba word for the word of the day!
                  </p>
                </div>

                {/* Word Display */}
                <div className={`mx-6 md:mx-8 lg:mx-10 mb-6 md:mb-8 lg:mb-10 ${wordCards[0].bgColor} ${wordCards[0].borderColor} border rounded-xl md:rounded-2xl lg:rounded-3xl p-4 md:p-6 lg:p-8`}>
                  <div className="flex items-center justify-between mb-3 md:mb-4 lg:mb-6">
                    <div className={`px-3 md:px-4 lg:px-5 py-1 md:py-1.5 lg:py-2 rounded-full text-xs md:text-sm lg:text-base font-medium ${wordCards[0].tagColor}`}>
                      Word of the day
                    </div>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleSuggest(wordCards[0].id)}
                      leftIcon={<Lightbulb className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />}
                      className="h-8 md:h-10 lg:h-12 px-4 md:px-6 lg:px-8 rounded-2xl md:rounded-3xl text-xs md:text-sm lg:text-base font-medium hover:scale-105 active:scale-95 transition-transform"
                    >
                      Suggest
                    </Button>
                  </div>
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-950">
                    {wordCards[0].word}
                  </h3>
                </div>
              </motion.div>

              {/* Voting Card */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="bg-white rounded-3xl md:rounded-[2rem] lg:rounded-[2.5rem] border border-neutral-100 shadow-soft overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Card Header */}
                <div className="p-6 md:p-8 lg:p-10 pb-4 md:pb-6 lg:pb-8">
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-neutral-950 mb-1 md:mb-2">
                    Vote for Today&apos;s Best Word
                  </h2>
                  <p className="text-neutral-600 text-sm md:text-base lg:text-lg">
                    Vote for the top ranked suggested words!
                  </p>
                </div>

                {/* Word Display */}
                <div className={`mx-6 md:mx-8 lg:mx-10 mb-6 md:mb-8 lg:mb-10 ${wordCards[1].bgColor} ${wordCards[1].borderColor} border rounded-xl md:rounded-2xl lg:rounded-3xl p-4 md:p-6 lg:p-8`}>
                  <div className="flex items-center justify-between mb-3 md:mb-4 lg:mb-6">
                    <div className={`px-3 md:px-4 lg:px-5 py-1 md:py-1.5 lg:py-2 rounded-full text-xs md:text-sm lg:text-base font-medium ${wordCards[1].tagColor}`}>
                      Word of the day
                    </div>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleVote(wordCards[1].id)}
                      leftIcon={<Vote className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />}
                      className="h-8 md:h-10 lg:h-12 px-4 md:px-6 lg:px-8 rounded-2xl md:rounded-3xl text-xs md:text-sm lg:text-base font-medium hover:scale-105 active:scale-95 transition-transform"
                    >
                      Vote
                    </Button>
                  </div>
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-950">
                    {wordCards[1].word}
                  </h3>
                </div>
              </motion.div>
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
                        <div className="text-orange-600 text-2xl font-bold">24</div>
                        <div className="text-orange-800 text-sm font-medium">Suggestions Today</div>
                      </div>
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-2xl border border-blue-200">
                        <div className="text-blue-600 text-2xl font-bold">156</div>
                        <div className="text-blue-800 text-sm font-medium">Votes Cast</div>
                      </div>
                    </div>
                    
                    {/* Recent Activity */}
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-neutral-950">Recent Activity</h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-xl">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-neutral-700">New word suggestion received</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-xl">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-sm text-neutral-700">5 votes cast on &ldquo;Technology&rdquo;</span>
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
  )
}
