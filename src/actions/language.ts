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

    await prisma.userProfile.upsert({
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

export async function getCommunities(): Promise<{
  success: boolean;
  data: any[];
}> {
  try {
    const communities = await prisma.neoCommunities.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    return { success: true, data: communities };
  } catch (err) {
    console.error('getCommunities unexpected error:', err);
    Sentry.captureException(err, {
      tags: { operation: 'getCommunities' },
    });
    return { success: false, data: [] };
  }
}

export async function listLanguages(): Promise<{
  success: boolean;
  data: any[];
}> {
  try {
    const languages = await prisma.language.findMany({
      select: {
        id: true,
        name: true,
        is_supported: true,
        icon: true,
      },
    });
    return { success: true, data: languages };
  } catch (err) {
    console.error('listLanguages unexpected error:', err);
    Sentry.captureException(err, {
      tags: { operation: 'listLanguages' },
    });
    return { success: false, data: [] };
  }
}

export async function setMyCommunity(
  neoCommunityId: number
): Promise<{ success: boolean; error?: string }> {
  try {
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
    //First delete any existing community for the user then create a new one
    await prisma.userNeoCommunity.deleteMany({ where: { userId: user.id } });
    const dbUser = await prisma.userNeoCommunity.create({
      data: { userId: user.id, neoCommunityId },
    });

    return { success: true };
  } catch (err) {
    console.error('setMyCommunity unexpected error:', err);
    Sentry.captureException(err, {
      tags: { operation: 'setMyCommunity' },
      extra: { neoCommunityId },
    });
    return { success: false, error: 'An unexpected error occurred' };
  }
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
