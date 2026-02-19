'use client';

import { NeoCommunity } from '@/types/neocommunity';
import { User as UserIcon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export function LanguageSwitchTag({
  userNeoCommunity,
  user,
  activeLanguage = 'english',
  onToggle,
}: {
  userNeoCommunity: NeoCommunity | null;
  user: { avatar?: string | null; name?: string | null } | null;
  activeLanguage?: 'community' | 'english';
  onToggle?: () => void;
}) {
  const router = useRouter();
  return (
    <div className="flex justify-end items-center gap-2">
      <div className="from-primary-600 to-primary-700 flex items-center justify-center py-1">
        <button
          onClick={() => onToggle?.()}
          disabled={!onToggle}
          type="button"
          className={`flex items-center rounded-md bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-sm overflow-hidden ${
            onToggle
              ? 'cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800/80'
              : ''
          }`}
        >
          <span
            className={`font-medium text-xs py-1 px-2 ${
              activeLanguage === 'community'
                ? 'text-white bg-[#9C62D9]'
                : 'text-neutral-500 dark:text-neutral-400'
            }`}
          >
            {userNeoCommunity?.short || 'NEO'}
          </span>
          <span
            className={`font-medium text-xs py-1 px-2 ${
              activeLanguage === 'english'
                ? 'text-white bg-[#9C62D9]'
                : 'text-neutral-500 dark:text-neutral-400'
            }`}
          >
            EN
          </span>
        </button>
      </div>
      <button
        onClick={() => router.push('/profile')}
        className="w-10 h-10 rounded-full overflow-hidden border-2 border-neutral-200 dark:border-neutral-700 hover:opacity-80 transition-opacity flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900 dark:focus:ring-neutral-100 shrink-0 lg:hidden"
      >
        {user?.avatar ? (
          <Image
            src={user.avatar}
            alt={user?.name || 'Contributor'}
            width={40}
            height={40}
            className="object-cover w-full h-full"
          />
        ) : (
          <UserIcon className="w-5 h-5 text-neutral-500" />
        )}
      </button>
    </div>
  );
}
