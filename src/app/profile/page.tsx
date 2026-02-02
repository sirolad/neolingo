'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Pencil,
  Settings,
  ChevronDown,
  Megaphone,
  FileText,
  LogOut,
  User as UserIcon,
  Award,
} from 'lucide-react';
import ReactCountryFlag from 'react-country-flag';
import { Layout } from '@/components/layout/Layout';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function ProfilePage() {
  const router = useRouter();
  const { appUser, logout } = useAuth();
  const user = appUser;

  const handleBack = () => {
    router.back();
  };

  const handleLogout = async () => {
    await logout();
    router.push('/signin');
  };

  return (
    <Layout className="bg-neutral-50">
      <div className="max-w-md lg:max-w-6xl mx-auto min-h-screen flex flex-col lg:py-8">
        {/* Mobile Header */}
        <header className="px-6 py-4 flex items-center relative lg:hidden">
          <button
            onClick={handleBack}
            className="p-2 -ml-2 text-neutral-800 hover:bg-neutral-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="absolute left-1/2 -translate-x-1/2 text-xl font-semibold text-neutral-950">
            Profile
          </h1>
        </header>

        {/* Desktop Header */}
        <div className="hidden lg:flex items-center justify-between px-8 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-neutral-950">My Profile</h1>
            <p className="text-neutral-500 mt-1">
              Manage your account settings and preferences
            </p>
          </div>
          <Button variant="outline" className="gap-2" onClick={handleLogout}>
            <LogOut className="w-4 h-4" />
            Log Out
          </Button>
        </div>

        <div className="flex-1 px-4 lg:px-8 pb-8 space-y-4 lg:space-y-0 lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Profile & Stats */}
          <div className="space-y-4 lg:space-y-6 lg:col-span-4">
            {/* Profile Card */}
            <div className="bg-white rounded-[2rem] p-6 flex flex-col items-center text-center shadow-sm h-fit">
              <div className="relative mb-4">
                <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden border-4 border-white shadow-sm transition-transform hover:scale-105">
                  {user?.avatar ? (
                    <Image
                      src={user.avatar}
                      alt={user.name || 'Profile'}
                      width={128}
                      height={128}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full bg-primary-100 flex items-center justify-center">
                      <UserIcon className="w-10 h-10 lg:w-14 lg:h-14 text-primary-600" />
                    </div>
                  )}
                </div>
                <div className="absolute bottom-0 right-0 bg-neutral-950 rounded-full p-1.5 lg:p-2 border-2 border-white cursor-pointer hover:bg-neutral-800 transition-colors">
                  <Pencil className="w-3 h-3 lg:w-4 lg:h-4 text-white" />
                </div>
              </div>

              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-lg lg:text-xl font-semibold text-neutral-950">
                  {user?.name || 'User2025'}
                </h2>
              </div>

              <p className="text-sm text-neutral-500 mb-4 lg:mb-6">
                {user?.email || 'JohnDoe@gmail.com'}
              </p>

              <div className="w-full pt-4 border-t border-neutral-100">
                <p className="text-xs text-neutral-400">
                  Joined 29th September, 2025
                </p>
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-white rounded-3xl p-5 lg:p-6 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 lg:w-14 lg:h-14 bg-amber-400 rounded-full flex items-center justify-center border-4 border-amber-200">
                  <Award className="w-6 h-6 lg:w-7 lg:h-7 text-neutral-900 fill-current" />
                </div>
                <div>
                  <p className="text-xs lg:text-sm text-neutral-500">
                    Total Experience Points
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-lg lg:text-xl font-bold text-neutral-950">
                      450 Cowries
                    </span>
                    <span className="text-xl lg:text-2xl">🐚</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop-only Curator CTA (moved from bottom) */}
            <div className="hidden lg:block">
              <div className="bg-neutral-950 rounded-[2rem] p-6 text-white text-center shadow-lg relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-10 translate-x-10 group-hover:translate-y-0 transition-transform duration-700" />
                <h3 className="text-lg font-bold mb-2 relative z-10">
                  Become a Curator
                </h3>
                <p className="text-neutral-400 text-sm mb-6 relative z-10">
                  Join our community of language experts and help preserve our
                  heritage.
                </p>
                <Button className="w-full bg-white text-neutral-950 hover:bg-neutral-100 border-none relative z-10">
                  Apply Now
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column: Settings */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-[2rem] p-6 lg:p-8 shadow-sm h-full">
              <div className="flex items-center gap-3 mb-6 lg:mb-8 border-b border-neutral-100 pb-4 lg:pb-6">
                <div className="w-10 h-10 rounded-full bg-neutral-50 flex items-center justify-center">
                  <Settings className="w-5 h-5 text-neutral-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-950">
                    Settings
                  </h3>
                  <p className="text-sm text-neutral-500">
                    Manage preferences and notifications
                  </p>
                </div>
              </div>

              <div className="space-y-6 lg:space-y-8">
                {/* App Preferences */}
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-neutral-400 uppercase tracking-wider">
                    Preferences
                  </h4>

                  {/* Notifications */}
                  <div className="flex items-center justify-between p-2 hover:bg-neutral-50 rounded-xl transition-colors">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-neutral-900">
                        Push Notifications
                      </span>
                      <span className="text-xs text-neutral-500">
                        Receive updates about your contributions
                      </span>
                    </div>
                    <Switch />
                  </div>

                  {/* Dark Mode */}
                  <div className="flex items-center justify-between p-2 hover:bg-neutral-50 rounded-xl transition-colors">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-neutral-900">
                        Dark Mode
                      </span>
                      <span className="text-xs text-neutral-500">
                        Switch between light and dark themes
                      </span>
                    </div>
                    <Switch />
                  </div>
                </div>

                <div className="h-px bg-neutral-100 w-full" />

                {/* Community & Support */}
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-neutral-400 uppercase tracking-wider">
                    Community
                  </h4>

                  {/* Neolingo Community */}
                  <div className="flex items-center justify-between cursor-pointer p-2 hover:bg-neutral-50 rounded-xl transition-colors group">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                        <Megaphone className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium text-neutral-700">
                        Neolingo Community
                      </span>
                    </div>
                    <div className="flex items-center gap-2 bg-neutral-100 px-2 py-1 rounded-md">
                      <ReactCountryFlag
                        countryCode="NG"
                        svg
                        className="w-4 h-4 rounded-sm"
                      />
                      <span className="text-xs font-medium text-neutral-600">
                        Yoruba
                      </span>
                    </div>
                  </div>

                  {/* Community Notes */}
                  <div className="flex items-center gap-3 cursor-pointer p-2 hover:bg-neutral-50 rounded-xl transition-colors group">
                    <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform">
                      <FileText className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium text-neutral-700">
                      Community Guidelines & Notes
                    </span>
                  </div>
                </div>

                {/* Mobile Log Out (Hidden on Desktop) */}
                <div className="pt-4 mt-4 border-t border-neutral-100 lg:hidden">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full text-left text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="text-sm font-medium">Log Out</span>
                  </button>
                </div>
              </div>

              <div className="mt-8 lg:hidden">
                <Button className="w-full bg-neutral-950 hover:bg-neutral-900 text-white rounded-2xl h-12 font-medium">
                  Become a Curator
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
