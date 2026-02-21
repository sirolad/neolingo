import { z } from 'zod';

// Schema for request validation
export const curateNeoSchema = z.object({
  userId: z.string().uuid('Invalid user ID'),
  termId: z.coerce.number().int('Invalid term ID'),
  type: z.enum(['POPULAR', 'ADOPTIVE', 'FUNCTIONAL', 'ROOT', 'CREATIVE']),
  text: z.string().min(1, 'Neo text is required'),
  audioUrl: z
    .union([z.string().url('Invalid audio URL'), z.literal('')])
    .transform(val => (val === '' ? null : val))
    .optional(),
});

export type CurateNeoData = z.infer<typeof curateNeoSchema>;

export type CurateNeoState = {
  errors?: {
    userId?: string[];
    termId?: string[];
    type?: string[];
    text?: string[];
    audioUrl?: string[];
    _form?: string[];
  };
  message?: string;
  failedSuggestions?: { index: number; errors: Record<string, string[]> }[];
  success?: boolean;
};
