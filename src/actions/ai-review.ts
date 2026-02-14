'use server';

import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

const ReviewResultSchema = z.object({
  strictDict: z.enum(['Approved', 'Rejected', 'Needs Review']),
  reason: z.string(),
  score: z.number().min(0).max(100),
});

export type ReviewResult = z.infer<typeof ReviewResultSchema>;

export async function analyzeRequest(request: {
  word: string;
  meaning?: string | null;
}) {
  try {
    const { object } = await generateObject({
      model: openai('gpt-4o-mini'),
      schema: ReviewResultSchema,
      prompt: `
        You are a strict linguistic curator for a dictionary app called Neolingo.
        Your task is to review a "Translation Request" where a user asks for a translation of a specific word.

        Word: "${request.word}"
        Context/Meaning: "${request.meaning || 'No context provided'}"

        Criteria for Approval:
        1. The word must be a real word or concept in the source language, which is not always English.
        2. It must not be offensive, hate speech, or spam.
        3. The context (if provided) should clarify the intended meaning.

        Output JSON:
        - strictDict: "Approved" if valid, "Rejected" if spam/offensive, "Needs Review" if unsure.
        - reason: A short explanation (max 1 sentence).
        - score: Confidence score (0-100).
      `,
    });

    return { success: true, data: object };
  } catch (error) {
    console.error('AI Analysis failed:', error);
    return { success: false, error: 'Failed to analyze request' };
  }
}
