'use client';

import { NeoCommunity } from '@/types/neocommunity';
import { CircleUser } from 'lucide-react';
import Image from 'next/image';
import ReactCountryFlag from 'react-country-flag';
import { useRouter } from 'next/navigation';

export function MyCommunityTag({
  userNeoCommunity,
  user,
}: {
  userNeoCommunity: NeoCommunity | null;
  user: { avatar?: string | null; name?: string | null } | null;
}) {
  const router = useRouter();

  return (
    <div className="text-2xl md:text-3xl lg:text-4xl lg:hidden flex  justify-end align-middle">
      <div className="from-primary-600 to-primary-700 flex items-center justify-center mr-2 py-1">
        <div className="flex items-center rounded-xs px-2 py-0.5 bg-white border border-neutral-200">
          <ReactCountryFlag
            countryCode={userNeoCommunity?.flagIcon || 'NG'}
            svg
            className="w-4 h-4"
          />
          <span className="text-zinc-800 font-bold text-[10px] pl-2">
            {userNeoCommunity?.short}
          </span>
        </div>
      </div>
      <button
        onClick={() => router.push('/profile')}
        className="focus:outline-none transition-transform active:scale-95"
      >
        {user?.avatar ? (
          <Image
            src={user.avatar}
            alt={user?.name || 'Contributor'}
            width={40}
            height={40}
            className="rounded-full"
          />
        ) : (
          <CircleUser className="w-10 h-10 text-neutral-400" />
        )}
      </button>
    </div>
  );
}
