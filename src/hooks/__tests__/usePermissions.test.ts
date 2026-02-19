import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { usePermissions } from '@/hooks/usePermissions';
import * as AuthContext from '@/contexts/AuthContext';

// Mock the AuthContext
vi.mock('@/contexts/AuthContext', () => ({
  useAuth: vi.fn(),
}));

describe('usePermissions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('ADMIN role', () => {
    beforeEach(() => {
      vi.mocked(AuthContext.useAuth).mockReturnValue({
        userRole: 'ADMIN',
      } as any);
    });

    it('should have all permissions', () => {
      const { result } = renderHook(() => usePermissions());

      expect(result.current.can('review:requests')).toBe(true);
      expect(result.current.can('manage:users')).toBe(true);
      expect(result.current.can('create:requests')).toBe(true);
      expect(result.current.can('vote:suggestions')).toBe(true);
      expect(result.current.can('view:admin')).toBe(true);
    });

    it('should return correct role', () => {
      const { result } = renderHook(() => usePermissions());
      expect(result.current.role).toBe('ADMIN');
    });

    it('should pass hasRole check', () => {
      const { result } = renderHook(() => usePermissions());
      expect(result.current.hasRole('ADMIN')).toBe(true);
      expect(result.current.hasRole('JUROR')).toBe(false);
    });
  });

  describe('JUROR role', () => {
    beforeEach(() => {
      vi.mocked(AuthContext.useAuth).mockReturnValue({
        userRole: 'JUROR',
      } as any);
    });

    it('should have juror permissions', () => {
      const { result } = renderHook(() => usePermissions());

      expect(result.current.can('review:requests')).toBe(true);
      expect(result.current.can('create:requests')).toBe(true);
      expect(result.current.can('vote:suggestions')).toBe(true);
      expect(result.current.can('view:admin')).toBe(true);
    });

    it('should not have admin-only permissions', () => {
      const { result } = renderHook(() => usePermissions());
      expect(result.current.can('manage:users')).toBe(false);
    });
  });

  describe('CONTRIBUTOR role', () => {
    beforeEach(() => {
      vi.mocked(AuthContext.useAuth).mockReturnValue({
        userRole: 'CONTRIBUTOR',
      } as any);
    });

    it('should have contributor permissions', () => {
      const { result } = renderHook(() => usePermissions());

      expect(result.current.can('create:requests')).toBe(true);
      expect(result.current.can('vote:suggestions')).toBe(true);
    });

    it('should not have elevated permissions', () => {
      const { result } = renderHook(() => usePermissions());
      expect(result.current.can('review:requests')).toBe(false);
      expect(result.current.can('manage:users')).toBe(false);
      expect(result.current.can('view:admin')).toBe(false);
    });
  });

  describe('EXPLORER role', () => {
    beforeEach(() => {
      vi.mocked(AuthContext.useAuth).mockReturnValue({
        userRole: 'EXPLORER',
      } as any);
    });

    it('should have no permissions', () => {
      const { result } = renderHook(() => usePermissions());

      expect(result.current.can('create:requests')).toBe(false);
      expect(result.current.can('review:requests')).toBe(false);
      expect(result.current.can('manage:users')).toBe(false);
      expect(result.current.can('vote:suggestions')).toBe(false);
      expect(result.current.can('view:admin')).toBe(false);
    });
  });

  describe('canAny', () => {
    it('should return true if user has any of the permissions', () => {
      vi.mocked(AuthContext.useAuth).mockReturnValue({
        userRole: 'CONTRIBUTOR',
      } as any);

      const { result } = renderHook(() => usePermissions());
      expect(result.current.canAny(['create:requests', 'manage:users'])).toBe(
        true
      );
    });

    it('should return false if user has none of the permissions', () => {
      vi.mocked(AuthContext.useAuth).mockReturnValue({
        userRole: 'EXPLORER',
      } as any);

      const { result } = renderHook(() => usePermissions());
      expect(
        result.current.canAny(['create:requests', 'review:requests'])
      ).toBe(false);
    });
  });

  describe('canAll', () => {
    it('should return true if user has all permissions', () => {
      vi.mocked(AuthContext.useAuth).mockReturnValue({
        userRole: 'ADMIN',
      } as any);

      const { result } = renderHook(() => usePermissions());
      expect(
        result.current.canAll(['create:requests', 'review:requests'])
      ).toBe(true);
    });

    it('should return false if user is missing any permission', () => {
      vi.mocked(AuthContext.useAuth).mockReturnValue({
        userRole: 'CONTRIBUTOR',
      } as any);

      const { result } = renderHook(() => usePermissions());
      expect(
        result.current.canAll(['create:requests', 'review:requests'])
      ).toBe(false);
    });
  });

  describe('hasAnyRole', () => {
    it('should return true if user has one of the roles', () => {
      vi.mocked(AuthContext.useAuth).mockReturnValue({
        userRole: 'JUROR',
      } as any);

      const { result } = renderHook(() => usePermissions());
      expect(result.current.hasAnyRole(['ADMIN', 'JUROR'])).toBe(true);
    });

    it('should return false if user has none of the roles', () => {
      vi.mocked(AuthContext.useAuth).mockReturnValue({
        userRole: 'EXPLORER',
      } as any);

      const { result } = renderHook(() => usePermissions());
      expect(result.current.hasAnyRole(['ADMIN', 'JUROR'])).toBe(false);
    });
  });

  describe('null/undefined role handling', () => {
    it('should default to EXPLORER when userRole is null', () => {
      vi.mocked(AuthContext.useAuth).mockReturnValue({
        userRole: null,
      } as any);

      const { result } = renderHook(() => usePermissions());
      expect(result.current.role).toBe('EXPLORER');
      expect(result.current.can('create:requests')).toBe(false);
    });

    it('should default to EXPLORER when userRole is undefined', () => {
      vi.mocked(AuthContext.useAuth).mockReturnValue({
        userRole: undefined,
      } as any);

      const { result } = renderHook(() => usePermissions());
      expect(result.current.role).toBe('EXPLORER');
    });
  });
});
