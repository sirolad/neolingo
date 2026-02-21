'use client';

import { useCallback, useMemo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import {
  hasPermission,
  hasAnyPermission,
  hasAllPermissions,
  type Permission,
  type Role,
} from '@/lib/auth/permissions';

/**
 * Client-side hook for checking user permissions
 * Uses the AuthContext to get the current user's role
 */
export function usePermissions() {
  const { userRole } = useAuth();
  const role = useMemo(() => (userRole as Role) || 'EXPLORER', [userRole]);

  /**
   * Check if the current user has a specific permission
   */
  const can = useCallback(
    (permission: Permission): boolean => {
      return hasPermission(role, permission);
    },
    [role]
  );

  /**
   * Check if the current user has any of the specified permissions
   */
  const canAny = useCallback(
    (permissions: Permission[]): boolean => {
      return hasAnyPermission(role, permissions);
    },
    [role]
  );

  /**
   * Check if the current user has all of the specified permissions
   */
  const canAll = useCallback(
    (permissions: Permission[]): boolean => {
      return hasAllPermissions(role, permissions);
    },
    [role]
  );

  /**
   * Check if the current user has a specific role
   */
  const hasRole = useCallback(
    (targetRole: Role): boolean => {
      return role === targetRole;
    },
    [role]
  );

  /**
   * Check if the current user has any of the specified roles
   */
  const hasAnyRole = useCallback(
    (roles: Role[]): boolean => {
      return roles.includes(role);
    },
    [role]
  );

  return useMemo(
    () => ({
      role,
      can,
      canAny,
      canAll,
      hasRole,
      hasAnyRole,
    }),
    [role, can, canAny, canAll, hasRole, hasAnyRole]
  );
}
