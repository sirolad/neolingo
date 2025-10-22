'use client';

import React from 'react';
import { TopNavigation } from './TopNavigation';
import { BottomNavigation } from './BottomNavigation';

interface ResponsiveNavigationProps {
  showTopNav?: boolean;
  showBottomNav?: boolean;
}

export function ResponsiveNavigation({
  showTopNav = true,
  showBottomNav = true,
}: ResponsiveNavigationProps) {
  return (
    <>
      {/* Desktop Navigation - Hidden on mobile */}
      {showTopNav && (
        <div className="hidden md:block">
          <TopNavigation />
        </div>
      )}

      {/* Mobile Navigation - Hidden on desktop */}
      {showBottomNav && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
          <BottomNavigation />
        </div>
      )}
    </>
  );
}

// Hook to determine if we should show navigation based on current route
export function useNavigationVisibility() {
  // You can expand this logic to hide navigation on certain pages
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const hideNavigationRoutes = [
    '/signin',
    '/signup',
    '/onboarding',
    '/splash',
    '/email-verification',
  ];

  // For now, return true for all routes that should show navigation
  return {
    showNavigation: true,
  };
}
