'use client';

import { NeoCommunity } from '@/types/neocommunity';
import { CircleUser } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export function LanguageSwitchTag({
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
        <div className="flex items-center rounded-xs bg-white border border-neutral-200">
          <span className="text-neutral-500 font-[500] text-[12px] py-1 px-1">
            {userNeoCommunity?.short}
          </span>
          <span className="py-1 px-1 text-zinc-50 font-[500] text-[12px] bg-[#9C62D9]">
            EN
          </span>
        </div>
      </div>
      {user?.avatar ? (
        <Image
          src={user.avatar}
          alt={user?.name || 'Contributor'}
          onClick={() => router.push('/profile')}
          width={40}
          height={40}
          className="rounded-full"
        />
      ) : (
        <CircleUser
          onClick={() => router.push('/profile')}
          className="w-10 h-10 text-neutral-400"
        />
      )}
    </div>
  );
}
