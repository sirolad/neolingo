'use server';

import { prisma } from '@/lib/prisma';
import type { PartOfSpeech, Domain } from '@/types/dictionary';
import type { Language } from '@/types/language';

/**
 * Catalog actions — shared reference data for use across multiple features.
 * Import from here instead of duplicating in dictionary.ts, review.ts, etc.
 */

/** Priority order reflecting real-world frequency of use */
const PART_OF_SPEECH_PRIORITY: Record<string, number> = {
  noun: 0,
  verb: 1,
  adjective: 2,
  adverb: 3,
  pronoun: 4,
  preposition: 5,
  conjunction: 6,
  interjection: 7,
  article: 8,
  determiner: 9,
};

export async function getPartsOfSpeech(): Promise<PartOfSpeech[]> {
  try {
    const data = await prisma.partOfSpeech.findMany();
    return data.sort((a, b) => {
      const pa = PART_OF_SPEECH_PRIORITY[a.name.toLowerCase()] ?? 99;
      const pb = PART_OF_SPEECH_PRIORITY[b.name.toLowerCase()] ?? 99;
      if (pa !== pb) return pa - pb;
      return a.name.localeCompare(b.name); // alphabetical fallback
    });
  } catch (error) {
    console.error('Failed to fetch parts of speech:', error);
    return [];
  }
}

export async function getSourceLanguages(): Promise<Language[]> {
  try {
    return await prisma.language.findMany({ orderBy: { name: 'asc' } });
  } catch (error) {
    console.error('Failed to fetch source languages:', error);
    return [];
  }
}

export async function getTargetLanguages(): Promise<Language[]> {
  try {
    return await prisma.language.findMany({
      where: { type: 'LRL' },
      orderBy: { name: 'asc' },
    });
  } catch (error) {
    console.error('Failed to fetch target languages:', error);
    return [];
  }
}

export async function getAllDomains(): Promise<Domain[]> {
  try {
    return await prisma.domain.findMany({ orderBy: { name: 'asc' } });
  } catch (error) {
    console.error('Failed to fetch all domains:', error);
    return [];
  }
}

export async function searchDomains(query: string): Promise<Domain[]> {
  if (!query || query.length < 2) return [];
  try {
    return await prisma.domain.findMany({
      where: { name: { contains: query, mode: 'insensitive' } },
      take: 5,
      orderBy: { name: 'asc' },
    });
  } catch (error) {
    console.error('Failed to search domains:', error);
    return [];
  }
}
