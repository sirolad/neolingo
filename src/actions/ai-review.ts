'use server';

import { generateText, Output } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';
import { requirePermission } from '@/lib/auth/server-auth';
import { logAudit } from '@/lib/audit';

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
  // Verify user has permission to use AI analysis
  let user;
  try {
    const result = await requirePermission('review:requests');
    user = result.user;
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Unauthorized to use AI analysis',
    };
  }

  try {
    const { output } = await generateText({
      model: openai('gpt-4o-mini'),
      output: Output.object({ schema: ReviewResultSchema }),
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

    // Log AI usage for audit trail
    await logAudit({
      userId: user.id,
      action: 'ai:analyze:request',
      resourceId: request.word,
      metadata: { meaning: request.meaning, result: output.strictDict },
    });

    return { success: true, data: output };
  } catch (error) {
    console.error('AI Analysis failed:', error);
    return { success: false, error: 'Failed to analyze request' };
  }
}
