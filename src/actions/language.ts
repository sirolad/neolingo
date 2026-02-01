'use server';

import prisma from '@/lib/prisma';
import createClient from '@/lib/supabase/server';
import * as Sentry from '@sentry/nextjs';

export async function setMyUILanguage(
  uiLanguageId: number
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error('Supabase getUser error:', userError);
      return { success: false, error: 'Unauthorized' };
    }

    await prisma.userProfile.upsert({
      where: { userId: user.id },
      update: { uiLanguageId },
      create: {
        userId: user.id,
        uiLanguageId,
        name: user.user_metadata?.name || '',
      },
    });

    return { success: true };
  } catch (err) {
    console.error('setMyUILanguage unexpected error:', err);
    Sentry.captureException(err, {
      tags: { operation: 'setMyUILanguage' },
      extra: { uiLanguageId },
    });
    return { success: false, error: 'An unexpected error occurred' };
  }
}

export async function getTargetLanguages(): Promise<{
  success: boolean;
  data: { id: number; name: string; icon: string | null }[];
}> {
  try {
    const languages = await prisma.language.findMany({
      where: { type: 'LRL' },
      select: {
        id: true,
        name: true,
        icon: true,
      },
      orderBy: { name: 'desc' },
    });
    return { success: true, data: languages };
  } catch (err) {
    console.error('getTargetLanguages unexpected error:', err);
    Sentry.captureException(err, {
      tags: { operation: 'getTargetLanguages' },
    });
    return { success: false, data: [] };
  }
}

export async function listUILanguages(): Promise<{
  success: boolean;
  data: { id: number; name: string; is_supported: boolean; icon: string }[];
}> {
  try {
    const languages = await prisma.uILanguage.findMany({
      select: {
        id: true,
        name: true,
        icon: true,
      },
    });
    return {
      success: true,
      data: languages.map(l => ({
        ...l,
        is_supported: true,
        icon: l.icon || '',
      })),
    };
  } catch (err) {
    console.error('listUILanguages unexpected error:', err);
    Sentry.captureException(err, {
      tags: { operation: 'listUILanguages' },
    });
    return { success: false, data: [] };
  }
}

export async function setMyTargetLanguage(
  languageId: number
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error('Supabase getUser error:', userError);
      return { success: false, error: 'Unauthorized' };
    }

    // Ensure user profile exists before creating relation
    // We need to fetch a default UI language (usually English) if creating a profile
    const uiLanguages = await prisma.uILanguage.findMany({
      where: { is_supported: true },
      take: 1,
    });
    const defaultUiLanguageId = uiLanguages.length > 0 ? uiLanguages[0].id : 1;

    await prisma.userProfile.upsert({
      where: { userId: user.id },
      update: {}, // Don't change anything if it exists
      create: {
        userId: user.id,
        name: user.user_metadata?.name || '',
        uiLanguageId: defaultUiLanguageId,
      },
    });

    await prisma.userTargetLanguage.deleteMany({ where: { userId: user.id } });
    await prisma.userTargetLanguage.create({
      data: { userId: user.id, languageId },
    });

    return { success: true };
  } catch (err) {
    console.error('setMyTargetLanguage unexpected error:', err);
    Sentry.captureException(err, {
      tags: { operation: 'setMyTargetLanguage' },
      extra: { languageId },
    });
    return { success: false, error: 'An unexpected error occurred' };
  }
}

export async function getUserLanguageAndCommunity(userId: string): Promise<{
  success: boolean;
  extra: { uiLanguageId: number | null; targetLanguageId: number | null };
}> {
  const userProfile = userId
    ? await prisma.userProfile.findFirst({
        where: { userId },
      })
    : null;
  const userTargetLanguage = userId
    ? await prisma.userTargetLanguage.findFirst({
        where: { userId },
      })
    : null;
  return {
    success: true,
    extra: {
      uiLanguageId: userProfile?.uiLanguageId || null,
      targetLanguageId: userTargetLanguage?.languageId || null,
    },
  };
}
