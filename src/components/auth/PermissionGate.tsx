'use client';

import { usePermissions } from '@/hooks/usePermissions';
import type { Permission } from '@/lib/auth/permissions';

interface PermissionGateProps {
  permission?: Permission;
  permissions?: Permission[];
  requireAll?: boolean;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * Component for conditional rendering based on permissions
 * More flexible than RequirePermission - doesn't redirect, just shows/hides content
 *
 * @example
 * // Single permission
 * <PermissionGate permission="review:requests">
 *   <ReviewButton />
 * </PermissionGate>
 *
 * @example
 * // Multiple permissions (any)
 * <PermissionGate permissions={["review:requests", "manage:users"]}>
 *   <AdminActions />
 * </PermissionGate>
 *
 * @example
 * // Multiple permissions (all required)
 * <PermissionGate
 *   permissions={["review:requests", "manage:users"]}
 *   requireAll
 * >
 *   <SuperAdminPanel />
 * </PermissionGate>
 *
 * @example
 * // With fallback content
 * <PermissionGate
 *   permission="create:requests"
 *   fallback={<UpgradePrompt />}
 * >
 *   <CreateRequestButton />
 * </PermissionGate>
 */
export function PermissionGate({
  permission,
  permissions,
  requireAll = false,
  children,
  fallback = null,
}: PermissionGateProps) {
  const { can, canAny, canAll } = usePermissions();

  let hasAccess = false;

  if (permission) {
    hasAccess = can(permission);
  } else if (permissions && permissions.length > 0) {
    hasAccess = requireAll ? canAll(permissions) : canAny(permissions);
  } else {
    // If no permissions specified, default to showing content
    hasAccess = true;
  }

  if (!hasAccess) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
