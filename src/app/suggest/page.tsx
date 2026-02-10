'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Check, Info, RefreshCcwDot } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import { WordOfTheDay } from '@/components/ui/WordOfTheDay';
import AudioRecorder from '@/components/AudioRecorder';
import { MyCommunityTag } from '@/components/ui/MyCommunityTag';

interface SuggestionForm {
  existingWord: string;
  adoptiveWord: string;
  functionalWord: string;
  rootWord: string;
  nonConformingWord?: string;
}

export default function SuggestPage() {
  const router = useRouter();

  const { userNeoCommunity, appUser } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<SuggestionForm>({
    existingWord: '',
    adoptiveWord: '',
    functionalWord: '',
    rootWord: '',
    nonConformingWord: '',
  });
  const [formDataAudio, setFormDataAudio] = useState<SuggestionForm>({
    existingWord: '',
    adoptiveWord: '',
    functionalWord: '',
    rootWord: '',
    nonConformingWord: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleAudioUrl = (field: string, url: string) => {
    switch (field) {
      case 'existingWord':
        setFormDataAudio(prev => ({ ...prev, existingWord: url }));
        break;
      case 'adoptiveWord':
        setFormDataAudio(prev => ({ ...prev, adoptiveWord: url }));
        break;
      case 'functionalWord':
        setFormDataAudio(prev => ({ ...prev, functionalWord: url }));
        break;
      case 'rootWord':
        setFormDataAudio(prev => ({ ...prev, rootWord: url }));
        break;
      case 'nonConformingWord':
        setFormDataAudio(prev => ({ ...prev, nonConformingWord: url }));
        break;

      default:
        break;
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.existingWord.trim()) {
      newErrors.existingWord = 'Existing word is required';
    }
    if (!formData.adoptiveWord.trim()) {
      newErrors.adoptiveWord = 'Adoptive word is required';
    }
    if (!formData.functionalWord.trim()) {
      newErrors.functionalWord = 'Functional word is required';
    }
    if (!formData.rootWord.trim()) {
      newErrors.rootWord = 'Root word is required';
    }
    if (!formData.nonConformingWord?.trim()) {
      newErrors.nonConformingWord = 'Non Conforming word is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;
    console.log('Form Data:', formData);
    console.log('Audio Data:', formDataAudio);
    setSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 2000);
  };

  const handleGoBack = () => {
    router.push('/home');
  };

  const handleSubmitAnother = () => {
    setSubmitted(false);
    setFormData({
      existingWord: '',
      adoptiveWord: '',
      functionalWord: '',
      rootWord: '',
      nonConformingWord: '',
    });
  };

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
                <div className="bg-white dark:bg-neutral-900 rounded-3xl md:rounded-[2rem] lg:rounded-[2.5rem] p-8 md:p-10 lg:p-12 border border-neutral-100 dark:border-neutral-800 shadow-soft text-center hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-success-100 dark:bg-green-900/30 rounded-full md:rounded-2xl lg:rounded-3xl flex items-center justify-center mx-auto mb-4 md:mb-6 lg:mb-8">
                    <Check className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-success-600 dark:text-green-400" />
                  </div>
                  <h1 className="heading-2 text-neutral-950 dark:text-neutral-50 mb-2 md:mb-3 lg:mb-4">
                    Suggestion Submitted!
                  </h1>
                  <p className="body-base lg:body-large text-neutral-600 dark:text-neutral-400 mb-6 md:mb-8 lg:mb-10 max-w-md mx-auto">
                    Thank you for contributing to the Neolingo community. Your
                    suggestion will be reviewed and made available for voting
                    soon.
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
    );
  }

  return (
    <ProtectedRoute>
      <Layout variant="home">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
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
              Curation Lounge
            </span>
            <div className="md:w-20">
              <MyCommunityTag
                userNeoCommunity={userNeoCommunity}
                user={appUser}
              />
            </div>{' '}
            {/* Spacer for centering */}
          </div>

          {/* Main Content */}
          <div className="flex-1 pb-20 md:pb-8">
            <WordOfTheDay
              word="Hydrogen"
              definition="A colorless, odorless, highly flammable gas that is the lightest and most abundant element in the universe."
              partOfSpeech="noun"
            />
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-neutral-900 rounded-3xl md:rounded-[2rem] lg:rounded-[2.5rem] border border-neutral-100 dark:border-neutral-800 shadow-soft overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="p-6 md:p-8 lg:p-10 space-y-6 md:space-y-8 lg:space-y-10"
              >
                {/* Two-column layout for larger screens */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                  <div className="space-y-2 md:space-y-3">
                    <label
                      htmlFor="existingWord"
                      className="block text-label lg:body-base lg:font-semibold text-neutral-950 dark:text-neutral-50"
                    >
                      Existing / Polular{' '}
                      <Info className="inline-block w-4 h-4 ml-1 text-red-600 dark:text-red-400" />
                    </label>
                    <div className="flex flex-row">
                      <div className="w-50">
                        <Input
                          id="existingWord"
                          name="existingWord"
                          type="text"
                          placeholder="Type here"
                          value={formData.existingWord}
                          onChange={handleInputChange}
                          disabled={submitting}
                          className="h-12 md:h-14 lg:h-16 text-base md:text-lg"
                        />
                        {errors.existingWord && (
                          <p className="body-small text-error-600">
                            {errors.existingWord}
                          </p>
                        )}
                      </div>
                      <div className="w-50 ml-4 flex items-center">
                        <AudioRecorder
                          onRecord={url => handleAudioUrl('existingWord', url)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 md:space-y-3">
                    <label
                      htmlFor="adoptiveWord"
                      className="block text-label lg:body-base lg:font-semibold text-neutral-950 dark:text-neutral-50"
                    >
                      Adoptive{' '}
                      <Info className="inline-block w-4 h-4 ml-1 text-red-600 dark:text-red-400" />
                    </label>
                    <div className="flex flex-row">
                      <div className="w-50">
                        <Input
                          id="adoptiveWord"
                          name="adoptiveWord"
                          type="text"
                          placeholder="Type here"
                          value={formData.adoptiveWord}
                          onChange={handleInputChange}
                          disabled={submitting}
                          className="h-12 md:h-14 lg:h-16 text-base md:text-lg"
                        />
                        {errors.adoptiveWord && (
                          <p className="body-small text-error-600">
                            {errors.adoptiveWord}
                          </p>
                        )}
                      </div>
                      <div className="w-50 ml-4 flex items-center">
                        <AudioRecorder
                          onRecord={url => handleAudioUrl('adoptiveWord', url)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                  <div className="space-y-2 md:space-y-3">
                    <label
                      htmlFor="functionalWord"
                      className="block text-label lg:body-base lg:font-semibold text-neutral-950 dark:text-neutral-50"
                    >
                      Functional{' '}
                      <Info className="inline-block w-4 h-4 ml-1 text-red-600 dark:text-red-400" />
                    </label>
                    <div className="flex flex-row">
                      <div className="w-50">
                        <Input
                          id="functionalWord"
                          name="functionalWord"
                          type="text"
                          placeholder="Type here"
                          value={formData.functionalWord}
                          onChange={handleInputChange}
                          disabled={submitting}
                          className="h-12 md:h-14 lg:h-16 text-base md:text-lg"
                        />
                        {errors.functionalWord && (
                          <p className="body-small text-error-600">
                            {errors.functionalWord}
                          </p>
                        )}
                      </div>
                      <div className="w-50 ml-4 flex items-center">
                        <AudioRecorder
                          onRecord={url =>
                            handleAudioUrl('functionalWord', url)
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 md:space-y-3">
                    <label
                      htmlFor="rootWord"
                      className="block text-label lg:body-base lg:font-semibold text-neutral-950 dark:text-neutral-50"
                    >
                      Root{' '}
                      <Info className="inline-block w-4 h-4 ml-1 text-red-600 dark:text-red-400" />
                    </label>
                    <div className="flex flex-row">
                      <div className="w-50">
                        <Input
                          id="rootWord"
                          name="rootWord"
                          type="text"
                          placeholder="Type here"
                          value={formData.rootWord}
                          onChange={handleInputChange}
                          disabled={submitting}
                          className="h-12 md:h-14 lg:h-16 text-base md:text-lg"
                        />
                        {errors.rootWord && (
                          <p className="body-small text-error-600">
                            {errors.rootWord}
                          </p>
                        )}
                      </div>
                      <div className="w-50 ml-4 flex items-center">
                        <AudioRecorder
                          onRecord={url => handleAudioUrl('rootWord', url)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                  <div className="space-y-2 md:space-y-3">
                    <label
                      htmlFor="nonConformingWord"
                      className="block text-label lg:body-base lg:font-semibold text-neutral-950 dark:text-neutral-50"
                    >
                      Non Conforming{' '}
                      <Info className="inline-block w-4 h-4 ml-1 text-red-600 dark:text-red-400" />
                    </label>
                    <div className="flex flex-row">
                      <div className="w-50">
                        <Input
                          id="nonConformingWord"
                          name="nonConformingWord"
                          type="text"
                          placeholder="Type here"
                          value={formData.nonConformingWord}
                          onChange={handleInputChange}
                          disabled={submitting}
                          className="h-12 md:h-14 lg:h-16 text-base md:text-lg"
                        />
                        {errors.nonConformingWord && (
                          <p className="body-small text-error-600">
                            {errors.nonConformingWord}
                          </p>
                        )}
                      </div>
                      <div className="w-50 ml-4 flex items-center">
                        <AudioRecorder
                          onRecord={url =>
                            handleAudioUrl('nonConformingWord', url)
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 md:pt-6">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    loading={submitting}
                    disabled={
                      formData.existingWord === '' &&
                      formData.adoptiveWord === '' &&
                      formData.functionalWord === '' &&
                      formData.rootWord === '' &&
                      formData.nonConformingWord === ''
                    }
                    className="h-12 md:h-14 lg:h-16 rounded-full md:rounded-full font-medium text-base md:text-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    Submit
                  </Button>
                </div>
              </form>
            </motion.div>

            <div className="flex flex-row justify-center gap-4 mt-6 md:mt-8 lg:mt-10">
              <Button
                variant="outline"
                size="md"
                onClick={handleGoBack}
                className="h-12 md:h-14 lg:h-16 text-base md:text-lg font-medium rounded-full hover:scale-[1.02] active:scale-[0.98] transition-all px-6 md:px-8"
              >
                Load More{' '}
                <RefreshCcwDot className="ml-2 w-5 h-5 md:w-6 md:h-6" />
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={handleSubmitAnother}
                className="h-12 md:h-14 lg:h-16 text-base md:text-lg font-medium rounded-full hover:scale-[1.02] active:scale-[0.98] transition-all px-6 md:px-8"
              >
                Next Word{' '}
                <ArrowLeft className="rotate-180 ml-2 w-5 h-5 md:w-6 md:h-6" />
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
