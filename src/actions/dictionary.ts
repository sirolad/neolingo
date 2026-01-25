'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { requestSchema, SubmitRequestState } from '@/lib/schemas/dictionary';

export async function submitRequest(
  prevState: SubmitRequestState,
  formData: FormData
): Promise<SubmitRequestState> {
  // Parse domains manually if sent as a stringified JSON array
  const domainsRaw = formData.get('domains');
  let domains: string[] = [];
  if (typeof domainsRaw === 'string') {
    try {
      domains = JSON.parse(domainsRaw);
    } catch {
      domains = [];
    }
  }

  const validatedFields = requestSchema.safeParse({
    word: formData.get('word'),
    meaning: formData.get('meaning'),
    sourceLanguageId: formData.get('sourceLanguageId'),
    targetLanguageId: formData.get('targetLanguageId'),
    partOfSpeechId: formData.get('partOfSpeechId'),
    domains: domains,
    userId: formData.get('userId'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to submit request.',
      success: false,
    };
  }

  const {
    word,
    meaning,
    sourceLanguageId,
    targetLanguageId,
    partOfSpeechId,
    domains: domainNames,
    userId,
  } = validatedFields.data;

  try {
    // 1. Handle Domains (Find or Create)
    const domainRecords = [];
    if (domainNames && domainNames.length > 0) {
      for (const domainName of domainNames) {
        // Find existing domain or create new one
        let domain = await prisma.domain.findUnique({
          where: { name: domainName },
        });

        if (!domain) {
          domain = await prisma.domain.create({
            data: { name: domainName },
          });
        }
        domainRecords.push(domain);
      }
    }

    // 2. Create the Translation Request
    await prisma.translationRequest.create({
      data: {
        word,
        meaning,
        sourceLanguageId,
        targetLanguageId,
        partOfSpeechId,
        userId,
        domains: {
          create: domainRecords.map(domain => ({
            domain: {
              connect: { id: domain.id },
            },
          })),
        },
      },
    });

    revalidatePath('/dictionary');
    return {
      success: true,
      message:
        'Request submitted successfully! It will be reviewed by an admin.',
    };
  } catch (error) {
    console.error('Database Error:', error);
    return {
      message: 'Database Error: Failed to submit request.',
      success: false,
    };
  }
}

export async function getPartsOfSpeech() {
  try {
    return await prisma.partOfSpeech.findMany({
      orderBy: { name: 'asc' },
    });
  } catch (error) {
    console.error('Failed to fetch parts of speech:', error);
    return [];
  }
}

export async function getSourceLanguages() {
  try {
    return await prisma.language.findMany({
      orderBy: { name: 'asc' },
    });
  } catch (error) {
    console.error('Failed to fetch source languages:', error);
    return [];
  }
}

export async function getTargetLanguagesForDict() {
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

export async function getUserProfileForRequest(userId: string) {
  try {
    const userProfile = await prisma.userProfile.findUnique({
      where: { userId },
      include: {
        uiLanguage: true,
        targetLanguages: {
          include: {
            language: true,
          },
        },
      },
    });

    return userProfile;
  } catch (error) {
    console.error('Failed to fetch user profile:', error);
    return null;
  }
}

export async function getAllDomains() {
  try {
    return await prisma.domain.findMany({
      orderBy: { name: 'asc' },
    });
  } catch (error) {
    console.error('Failed to fetch all domains:', error);
    return [];
  }
}

export async function searchDomains(query: string) {
  if (!query || query.length < 2) return [];
  try {
    return await prisma.domain.findMany({
      where: {
        name: {
          contains: query,
          mode: 'insensitive',
        },
      },
      take: 5,
      orderBy: { name: 'asc' },
    });
  } catch (error) {
    console.error('Failed to search domains:', error);
    return [];
  }
}
