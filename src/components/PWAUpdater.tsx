'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';

export default function PWAUpdater() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      // Check for updates every hour
      const interval = setInterval(
        () => {
          navigator.serviceWorker.ready.then(registration => {
            registration.update();
          });
        },
        60 * 60 * 1000
      );

      // Listen for controller change (meaning a new worker has activated)
      const handleControllerChange = () => {
        toast.info('New version available', {
          description:
            'A new version of Neolingo is available. Reload to update.',
          action: {
            label: 'Reload',
            onClick: () => window.location.reload(),
          },
          duration: Infinity,
          id: 'pwa-update-toast', // prevent duplicates
        });
      };

      navigator.serviceWorker.addEventListener(
        'controllerchange',
        handleControllerChange
      );

      return () => {
        clearInterval(interval);
        navigator.serviceWorker.removeEventListener(
          'controllerchange',
          handleControllerChange
        );
      };
    }
  }, []);

  return null;
}
