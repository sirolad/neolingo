'use client';

import { NeoCommunity } from '@/types/neocommunity';
import { User as UserIcon } from 'lucide-react';
import Image from 'next/image';
import ReactCountryFlag from 'react-country-flag';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export function MyCommunityTag({
  userNeoCommunity,
  user,
  className,
  hideAvatar = false,
}: {
  userNeoCommunity: NeoCommunity | null;
  user: { avatar?: string | null; name?: string | null } | null;
  className?: string;
  hideAvatar?: boolean;
}) {
  const router = useRouter();

  return (
    <div
      className={cn('flex justify-end items-center gap-2 lg:hidden', className)}
    >
      <div className="from-primary-600 to-primary-700 flex items-center justify-center py-1">
        <div className="flex items-center rounded-md px-2 py-1 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-sm">
          <ReactCountryFlag
            countryCode={userNeoCommunity?.flagIcon || 'NG'}
            svg
            className="w-4 h-4 rounded-sm"
          />
          <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200 pl-2">
            {userNeoCommunity?.short}
          </span>
        </div>
      </div>
      {!hideAvatar && (
        <button
          onClick={() => router.push('/profile')}
          className="w-10 h-10 rounded-full overflow-hidden border-2 border-neutral-200 dark:border-neutral-700 hover:opacity-80 transition-opacity flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900 dark:focus:ring-neutral-100 shrink-0"
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
      )}
    </div>
  );
}
