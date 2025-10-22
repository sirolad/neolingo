'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Layout } from '@/components/layout/Layout';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/signin');
    }
  }, [user, isLoading, router]);

  // Show minimal loading state only during initial auth check
  if (isLoading) {
    return (
      <Layout variant="home">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-neutral-600">Loading...</p>
          </div>
        </div>
      </Layout>
    );
  }

  // If no user after loading, return null (will redirect)
  if (!user) {
    return null;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
