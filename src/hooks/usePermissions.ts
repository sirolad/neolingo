'use client';

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
  const role = (userRole as Role) || 'EXPLORER';

  /**
   * Check if the current user has a specific permission
   */
  const can = (permission: Permission): boolean => {
    return hasPermission(role, permission);
  };

  /**
   * Check if the current user has any of the specified permissions
   */
  const canAny = (permissions: Permission[]): boolean => {
    return hasAnyPermission(role, permissions);
  };

  /**
   * Check if the current user has all of the specified permissions
   */
  const canAll = (permissions: Permission[]): boolean => {
    return hasAllPermissions(role, permissions);
  };

  /**
   * Check if the current user has a specific role
   */
  const hasRole = (targetRole: Role): boolean => {
    return role === targetRole;
  };

  /**
   * Check if the current user has any of the specified roles
   */
  const hasAnyRole = (roles: Role[]): boolean => {
    return roles.includes(role);
  };

  return {
    role,
    can,
    canAny,
    canAll,
    hasRole,
    hasAnyRole,
  };
}
