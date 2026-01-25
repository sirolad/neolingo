'use client';

import React, { useActionState, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Loader2, Check, X, Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { submitRequest } from '@/actions/dictionary';
import { requestSchema } from '@/lib/schemas/dictionary';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

// Extended schema to match the form fields exactly
type RequestFormValues = z.infer<typeof requestSchema>;

interface RequestFormProps {
  partsOfSpeech: { id: number; name: string; code: string }[];
  sourceLanguages: { id: number; name: string }[];
  targetLanguages: { id: number; name: string }[];
  showButton?: boolean;
  userTargetLanguages?: Array<{ id: number; name: string }>;
  availableDomains?: Array<{ id: number; name: string }>;
}

export function RequestForm({
  partsOfSpeech,
  sourceLanguages,
  targetLanguages,
  showButton = true,
  userTargetLanguages,
  availableDomains = [],
}: RequestFormProps) {
  const { appUser } = useAuth();
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(submitRequest, {
    success: false,
    message: '',
  });

  const [domainInput, setDomainInput] = useState('');
  const [domains, setDomains] = useState<string[]>([]);
  const [domainSuggestions, setDomainSuggestions] = useState<
    Array<{ id: number; name: string }>
  >([]);

  // Filter domains based on input
  useEffect(() => {
    if (domainInput.trim().length > 0) {
      const filtered = availableDomains.filter(
        d =>
          d.name.toLowerCase().includes(domainInput.toLowerCase()) &&
          !domains.includes(d.name)
      );
      setDomainSuggestions(filtered);
    } else {
      setDomainSuggestions([]);
    }
  }, [domainInput, availableDomains, domains]);

  const handleAddDomain = (domainToAdd?: string) => {
    const value = domainToAdd || domainInput.trim();
    if (value && !domains.includes(value)) {
      const newDomains = [...domains, value];
      setDomains(newDomains);
      form.setValue('domains', newDomains);
      setDomainInput('');
      setDomainSuggestions([]);
    }
  };
  const englishId = sourceLanguages.find(l => l.name === 'English')?.id || 1;
  const userLangId = userTargetLanguages?.[0]?.id || targetLanguages[0]?.id;
  const userLangName =
    userTargetLanguages?.[0]?.name || targetLanguages[0]?.name;

  const [selectedSourceId, setSelectedSourceId] = useState<number>(englishId);

  const form = useForm<RequestFormValues>({
    resolver: zodResolver(requestSchema) as any,
    mode: 'onChange',
    defaultValues: {
      word: '',
      meaning: '',
      sourceLanguageId: englishId,
      targetLanguageId: userLangId,
      partOfSpeechId: 0,
      userId: appUser?.id || '',
      domains: [],
    },
  });

  // Update target language when source changes or userLang loads
  useEffect(() => {
    const targetId = selectedSourceId === englishId ? userLangId : englishId;
    form.setValue('sourceLanguageId', selectedSourceId);
    form.setValue('targetLanguageId', targetId);
  }, [selectedSourceId, userLangId, englishId, form]);

  // Update hidden userId field when auth loads
  useEffect(() => {
    if (appUser) {
      form.setValue('userId', appUser.id);
    }
  }, [appUser, form]);

  const handleRemoveDomain = (domainToRemove: string) => {
    const newDomains = domains.filter(d => d !== domainToRemove);
    setDomains(newDomains);
    form.setValue('domains', newDomains);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddDomain();
    }
  };

  const handleSuggestionClick = (domainName: string) => {
    handleAddDomain(domainName);
  };

  return (
    <>
      {state.success ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-green-900 mb-2">
            Request Submitted!
          </h3>
          <p className="text-green-700 mb-6">{state.message}</p>
          <Button onClick={() => router.push('/dictionary')} variant="primary">
            Back to Dictionary
          </Button>
        </motion.div>
      ) : (
        <>
          <form
            id="request-form"
            action={formData => {
              // Append domains as JSON string for server action
              formData.append('domains', JSON.stringify(domains));
              formAction(formData);
            }}
            className="space-y-5"
          >
            <input type="hidden" name="userId" value={appUser?.id || ''} />

            {/* Language Selection - Radio Style Source Toggle */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-700">
                Source Language (Select one)
              </label>
              <input
                type="hidden"
                name="sourceLanguageId"
                value={selectedSourceId}
              />
              <input
                type="hidden"
                name="targetLanguageId"
                value={selectedSourceId === englishId ? userLangId : englishId}
              />

              <div className="grid grid-cols-2 gap-4">
                {/* English Option */}
                <div
                  onClick={() => setSelectedSourceId(englishId)}
                  className={`p-4 rounded-lg border cursor-pointer flex items-center justify-between transition-colors ${
                    selectedSourceId === englishId
                      ? 'bg-white border-[rgba(17,17,17,0.15)]'
                      : 'bg-[#F4F4F4] border-transparent'
                  }`}
                >
                  <span className="text-sm font-normal text-[#111111]">
                    English
                  </span>
                  <div
                    className={`w-[22px] h-[22px] rounded-full border-[1.5px] flex items-center justify-center ${
                      selectedSourceId === englishId
                        ? 'border-[#111111]'
                        : 'border-[rgba(17,17,17,0.3)]'
                    }`}
                  >
                    {selectedSourceId === englishId && (
                      <div className="w-[10px] h-[10px] bg-[#111111] rounded-full"></div>
                    )}
                  </div>
                </div>

                {/* User Language Option */}
                <div
                  onClick={() => setSelectedSourceId(userLangId)}
                  className={`p-4 rounded-lg border cursor-pointer flex items-center justify-between transition-colors ${
                    selectedSourceId === userLangId
                      ? 'bg-white border-[rgba(17,17,17,0.15)]'
                      : 'bg-[#F4F4F4] border-transparent'
                  }`}
                >
                  <span className="text-sm font-normal text-[#111111]">
                    {userLangName}
                  </span>
                  <div
                    className={`w-[22px] h-[22px] rounded-full border-[1.5px] flex items-center justify-center ${
                      selectedSourceId === userLangId
                        ? 'border-[#111111]'
                        : 'border-[rgba(17,17,17,0.3)]'
                    }`}
                  >
                    {selectedSourceId === userLangId && (
                      <div className="w-[10px] h-[10px] bg-[#111111] rounded-full"></div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Word Input */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-neutral-700">
                Word
              </label>
              <Input
                name="word"
                placeholder="Enter the word"
                error={!!state.errors?.word}
              />
              {state.errors?.word && (
                <p className="text-red-500 text-sm mt-1">
                  {state.errors.word[0]}
                </p>
              )}
            </div>

            {/* Part of Speech */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-neutral-700">
                Part of Speech
              </label>
              <Select
                name="partOfSpeechId"
                onValueChange={val =>
                  form.setValue('partOfSpeechId', Number(val))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select part of speech" />
                </SelectTrigger>
                <SelectContent>
                  {partsOfSpeech.map(pos => (
                    <SelectItem key={pos.id} value={pos.id.toString()}>
                      {pos.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {state.errors?.partOfSpeechId && (
                <p className="text-red-500 text-sm mt-1">
                  {state.errors.partOfSpeechId[0]}
                </p>
              )}
            </div>

            {/* Meaning */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-neutral-700">
                Meaning
              </label>
              <Input
                name="meaning"
                placeholder="Enter the meaning or context"
                error={!!state.errors?.meaning}
              />
            </div>

            {/* Related Domains (Tags) */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-neutral-700">
                Related Domains
              </label>
              <div className="relative">
                <div className="flex gap-2 mb-2">
                  <Input
                    value={domainInput}
                    onChange={e => setDomainInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="e.g. medical, law (Press Enter)"
                    className="flex-1"
                    autoComplete="off"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleAddDomain()}
                    className="px-3"
                  >
                    <Plus className="w-5 h-5" />
                  </Button>
                </div>

                {/* Domain Suggestions */}
                {domainSuggestions.length > 0 && (
                  <div className="absolute z-10 w-full bg-white border border-neutral-200 rounded-lg shadow-lg max-h-48 overflow-y-auto mt-1">
                    {domainSuggestions.map(domain => (
                      <button
                        key={domain.id}
                        type="button"
                        onClick={() => handleSuggestionClick(domain.name)}
                        className="w-full text-left px-4 py-2 hover:bg-neutral-50 text-sm text-neutral-700 transition-colors"
                      >
                        {domain.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {domains.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {domains.map(domain => (
                    <span
                      key={domain}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-neutral-100 text-neutral-800"
                    >
                      {domain}
                      <button
                        type="button"
                        onClick={() => handleRemoveDomain(domain)}
                        className="ml-2 hover:text-red-500"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {state.message && !state.success && (
              <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                {state.message}
              </div>
            )}
          </form>

          {/* Submit Button - Outside the form fields container */}
          {showButton && (
            <Button
              form="request-form"
              type="submit"
              variant="primary"
              className="w-full h-12 text-base font-semibold rounded-full mt-16"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Request'
              )}
            </Button>
          )}
        </>
      )}
    </>
  );
}
