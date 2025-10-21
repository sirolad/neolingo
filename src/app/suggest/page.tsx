'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Lightbulb, ArrowLeft, Check } from 'lucide-react'
import { Layout } from '@/components/layout/Layout'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { useAuth } from '@/contexts/AuthContext'

interface SuggestionForm {
  englishWord: string
  yorubaWord: string
  definition: string
  context: string
}

export default function SuggestPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState<SuggestionForm>({
    englishWord: '',
    yorubaWord: '',
    definition: '',
    context: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.englishWord.trim()) {
      newErrors.englishWord = 'English word is required'
    }
    if (!formData.yorubaWord.trim()) {
      newErrors.yorubaWord = 'Yoruba translation is required'
    }
    if (!formData.definition.trim()) {
      newErrors.definition = 'Definition is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      setSubmitting(false)
      setSubmitted(true)
    }, 2000)
  }

  const handleGoBack = () => {
    router.push('/home')
  }

  const handleSubmitAnother = () => {
    setSubmitted(false)
    setFormData({
      englishWord: '',
      yorubaWord: '',
      definition: '',
      context: ''
    })
  }

  if (submitted) {
    return (
      <ProtectedRoute>
        <Layout variant="home">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex-1 flex items-center justify-center py-8 md:py-12 lg:py-16 min-h-[70vh]">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-md md:max-w-lg lg:max-w-xl"
            >
              <div className="bg-white rounded-3xl md:rounded-[2rem] lg:rounded-[2.5rem] p-8 md:p-10 lg:p-12 border border-neutral-100 shadow-soft text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-success-100 rounded-full md:rounded-2xl lg:rounded-3xl flex items-center justify-center mx-auto mb-4 md:mb-6 lg:mb-8">
                  <Check className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-success-600" />
                </div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-950 mb-2 md:mb-3 lg:mb-4">Suggestion Submitted!</h1>
                <p className="text-neutral-600 text-sm md:text-base lg:text-lg mb-6 md:mb-8 lg:mb-10 max-w-md mx-auto">
                  Thank you for contributing to the Neolingo community. Your suggestion will be reviewed and made available for voting soon.
                </p>
                <div className="space-y-3 md:space-y-4">
                  <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    onClick={handleSubmitAnother}
                    className="h-12 md:h-14 lg:h-16 text-base md:text-lg font-medium rounded-2xl md:rounded-3xl hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    Submit Another
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    fullWidth
                    onClick={handleGoBack}
                    className="h-12 md:h-14 lg:h-16 text-base md:text-lg font-medium rounded-2xl md:rounded-3xl hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    Back to Home
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        </Layout>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <Layout variant="home">
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between py-4 md:py-6 lg:py-8">
          <button
            onClick={handleGoBack}
            className="inline-flex items-center text-neutral-950 hover:text-primary-800 transition-colors p-2 rounded-lg hover:bg-neutral-100"
          >
            <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 mr-2" />
            <span className="font-medium text-sm md:text-base">Back</span>
          </button>
          <h1 className="text-lg md:text-xl lg:text-2xl font-semibold text-neutral-950">Make Suggestion</h1>
          <div className="w-16 md:w-20"></div> {/* Spacer for centering */}
        </div>

        {/* Main Content */}
        <div className="flex-1 pb-20 md:pb-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-3xl md:rounded-[2rem] lg:rounded-[2.5rem] border border-neutral-100 shadow-soft overflow-hidden hover:shadow-lg transition-shadow"
          >
            {/* Card Header */}
            <div className="p-6 md:p-8 lg:p-10 pb-4 md:pb-6 lg:pb-8 border-b border-neutral-100">
              <div className="flex items-center gap-3 md:gap-4 lg:gap-5 mb-3 md:mb-4">
                <div className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-orange-100 rounded-full md:rounded-2xl lg:rounded-3xl flex items-center justify-center">
                  <Lightbulb className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-orange-600" />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-neutral-950">
                    Suggest a New Word
                  </h2>
                  <p className="text-neutral-600 text-sm md:text-base lg:text-lg">
                    Help expand our Yoruba dictionary
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 md:p-8 lg:p-10 space-y-6 md:space-y-8 lg:space-y-10">
              {/* Two-column layout for larger screens */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                <div className="space-y-2 md:space-y-3">
                  <label htmlFor="englishWord" className="block text-sm md:text-base lg:text-lg font-medium text-neutral-950">English Word</label>
                  <Input
                    id="englishWord"
                    name="englishWord"
                    type="text"
                    placeholder="Enter the English word"
                    value={formData.englishWord}
                    onChange={handleInputChange}
                    error={errors.englishWord}
                    disabled={submitting}
                    className="h-12 md:h-14 lg:h-16 text-base md:text-lg"
                  />
                </div>

                <div className="space-y-2 md:space-y-3">
                  <label htmlFor="yorubaWord" className="block text-sm md:text-base lg:text-lg font-medium text-neutral-950">Yoruba Translation</label>
                  <Input
                    id="yorubaWord"
                    name="yorubaWord"
                    type="text"
                    placeholder="Enter the Yoruba translation"
                    value={formData.yorubaWord}
                    onChange={handleInputChange}
                    error={errors.yorubaWord}
                    disabled={submitting}
                    className="h-12 md:h-14 lg:h-16 text-base md:text-lg"
                  />
                </div>
              </div>

              <div className="space-y-2 md:space-y-3">
                <label className="block text-sm md:text-base lg:text-lg font-medium text-neutral-950">
                  Definition
                </label>
                <textarea
                  name="definition"
                  rows={3}
                  className="block w-full px-4 md:px-5 lg:px-6 py-3 md:py-4 lg:py-5 border border-neutral-200 rounded-2xl md:rounded-3xl bg-white text-neutral-950 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none text-base md:text-lg transition-all hover:border-neutral-300 focus:scale-[1.02]"
                  placeholder="Provide a clear definition or meaning"
                  value={formData.definition}
                  onChange={handleInputChange}
                  disabled={submitting}
                />
                {errors.definition && (
                  <p className="text-sm md:text-base text-error-600">{errors.definition}</p>
                )}
              </div>

              <div className="space-y-2 md:space-y-3">
                <label className="block text-sm md:text-base lg:text-lg font-medium text-neutral-950">
                  Context / Usage Example <span className="text-neutral-500">(Optional)</span>
                </label>
                <textarea
                  name="context"
                  rows={3}
                  className="block w-full px-4 md:px-5 lg:px-6 py-3 md:py-4 lg:py-5 border border-neutral-200 rounded-2xl md:rounded-3xl bg-white text-neutral-950 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none text-base md:text-lg transition-all hover:border-neutral-300 focus:scale-[1.02]"
                  placeholder="Provide an example sentence or context of usage"
                  value={formData.context}
                  onChange={handleInputChange}
                  disabled={submitting}
                />
              </div>

              <div className="pt-4 md:pt-6">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  loading={submitting}
                  className="h-12 md:h-14 lg:h-16 rounded-2xl md:rounded-3xl font-medium text-base md:text-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  Submit Suggestion
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
      </Layout>
    </ProtectedRoute>
  )
}
