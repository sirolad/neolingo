import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/supabase/server';
import { getUserContext } from '@/actions/auth';

/**
 * Get current user's authentication data including role and profile
 * This endpoint fetches fresh data from the database instead of relying on cookies
 */
export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({
        user: null,
        role: null,
        profile: null,
        targetLanguage: null,
      });
    }

    // Fetch user context (role, profile, language) from database
    const { userRole, userProfile, userTargetLanguage } = await getUserContext(
      user.id
    );

    return NextResponse.json({
      user,
      role: userRole?.role?.name || null,
      languageId: userProfile?.uiLanguageId || null,
      neoCommunityId: userTargetLanguage?.languageId || null,
      neoCommunity: userTargetLanguage?.language
        ? {
            id: userTargetLanguage.language.id.toString(),
            name: userTargetLanguage.language.name,
            short: userTargetLanguage.language.short || '',
            flagIcon: userTargetLanguage.language.icon || '',
          }
        : null,
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user data' },
      { status: 500 }
    );
  }
}
