import NeoLanguage from '@/components/NeoLanguage';
import {
  getTargetLanguages,
  getUserLanguageAndCommunity,
} from '@/actions/language';
import { getCurrentUser } from '@/lib/supabase/server';

export default async function NeoLanguageSetupPage() {
  const { data: languages } = await getTargetLanguages();
  const user = await getCurrentUser();

  let initialSelectedId: number | null = null;
  if (user) {
    const { extra } = await getUserLanguageAndCommunity(user.id);
    initialSelectedId = extra?.targetLanguageId || null;
  }

  return (
    <NeoLanguage
      languages={languages || []}
      initialSelectedId={initialSelectedId}
    />
  );
}
