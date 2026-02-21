import { describe, it, expect } from 'vitest';
import { normalizeUser } from '../user';
import type { User } from '@supabase/supabase-js';

describe('user utility', () => {
  describe('normalizeUser', () => {
    it('should return null if user is null', () => {
      expect(normalizeUser(null)).toBeNull();
    });

    it('should handle user with minimal fields', () => {
      const mockUser = {
        id: '123',
        email: 'test@example.com',
        created_at: '2023-01-01',
      } as unknown as User;

      const result = normalizeUser(mockUser);
      expect(result).toEqual({
        id: '123',
        email: 'test@example.com',
        displayName: null,
        avatar: null,
        provider: null,
        createdAt: '2023-01-01',
        raw: mockUser,
        name: null,
        roleName: null,
      });
    });

    it('should extract metadata fields correctly (name, avatar, app_metadata)', () => {
      const mockUser = {
        id: '123',
        email: 'test@example.com',
        created_at: '2023-01-01',
        user_metadata: {
          name: 'Test Setup',
          avatar_url: 'https://avatar.com/1',
          roleName: 'user',
        },
        app_metadata: {
          provider: 'google',
        },
      } as unknown as User;

      const result = normalizeUser(mockUser);
      expect(result).toEqual({
        id: '123',
        email: 'test@example.com',
        displayName: 'Test Setup',
        avatar: 'https://avatar.com/1',
        provider: 'google',
        createdAt: '2023-01-01',
        raw: mockUser,
        name: 'Test Setup',
        roleName: 'user',
      });
    });

    it('should fallback to alternative fields for displayName and avatar', () => {
      const mockUser = {
        id: '123',
        user_metadata: {
          full_name: 'Full Name',
          picture: 'https://avatar.com/full',
        },
      } as unknown as User;

      const result = normalizeUser(mockUser);
      expect(result?.displayName).toBe('Full Name');
      expect(result?.avatar).toBe('https://avatar.com/full');
    });
  });
});
