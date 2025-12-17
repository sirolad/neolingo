'use server';

import prisma from '@/lib/prisma';
import createClient from '@/lib/supabase/server';
import * as Sentry from '@sentry/nextjs';

export async function setMyLanguage(
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

    const dbUser = await prisma.userProfile.upsert({
      where: { userId: user.id },
      update: { languageId },
      create: {
        userId: user.id,
        languageId,
        name: user.user_metadata?.name || '',
      },
    });

    return { success: true };
  } catch (err) {
    console.error('setMyLanguage unexpected error:', err);
    Sentry.captureException(err, {
      tags: { operation: 'setMyLanguage' },
      extra: { languageId },
    });
    return { success: false, error: 'An unexpected error occurred' };
  }
}

export async function listCountries(): Promise<{
  success: boolean;
  data: any[];
}> {
  const languages = await prisma.country.findMany({
    select: {
      id: true,
      name: true,
      icon: true,
      neoCommunities: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  return { success: true, data: languages };
}

export async function listLanguages(): Promise<{
  success: boolean;
  data: any[];
}> {
  const languages = await prisma.language.findMany({
    select: {
      id: true,
      name: true,
      icon: true,
    },
  });
  return { success: true, data: languages };
}

export async function setMyCommunity(
  neoCommunityId: number
): Promise<{ success: boolean; error?: string }> {
  // Placeholder function for setting user's community
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error('Supabase getUser error:', userError);
    return { success: false, error: 'Unauthorized' };
  }
  await prisma.userNeoCommunity.deleteMany({ where: { userId: user.id } });
  const dbUser = await prisma.userNeoCommunity.create({
    data: { userId: user.id, neoCommunityId },
  });

  return { success: true };
}

export async function getUserLanguageAndCommunity(userId: string): Promise<{
  success: boolean;
  extra: { languageId: number | null; neoCommunityId: number | null };
}> {
  const userProfile = userId
    ? await prisma.userProfile.findFirst({
        where: { userId },
      })
    : null;
  const userNeoCommunity = userId
    ? await prisma.userNeoCommunity.findFirst({
        where: { userId },
      })
    : null;
  return {
    success: true,
    extra: {
      languageId: userProfile?.languageId || null,
      neoCommunityId: userNeoCommunity?.neoCommunityId || null,
    },
  };
}
