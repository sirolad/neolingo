'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { usePermissions } from '@/hooks/usePermissions';
import type { Permission } from '@/lib/auth/permissions';

interface RequirePermissionProps {
  permission: Permission;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  redirectTo?: string;
}

/**
 * Component that requires a specific permission to render its children
 * Optionally redirects to a specified route if permission is not met
 *
 * @example
 * <RequirePermission permission="review:requests">
 *   <ReviewPanel />
 * </RequirePermission>
 *
 * @example
 * <RequirePermission
 *   permission="manage:users"
 *   redirectTo="/unauthorized"
 * >
 *   <AdminPanel />
 * </RequirePermission>
 */
export function RequirePermission({
  permission,
  children,
  fallback = null,
  redirectTo,
}: RequirePermissionProps) {
  const { can } = usePermissions();
  const router = useRouter();
  const hasPermission = can(permission);

  useEffect(() => {
    if (!hasPermission && redirectTo) {
      router.push(redirectTo);
    }
  }, [hasPermission, redirectTo, router]);

  if (!hasPermission) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
