import { describe, it, expect } from 'vitest';
import { cn, formatJoinedDate } from '../utils';

describe('utils', () => {
  describe('cn (className utility)', () => {
    it('should merge class names correctly', () => {
      const result = cn('btn', 'btn-primary');
      expect(result).toContain('btn');
      expect(result).toContain('btn-primary');
    });

    it('should handle conditional classes', () => {
      const isActive = true;
      const result = cn('btn', isActive && 'btn-active');
      expect(result).toContain('btn');
      expect(result).toContain('btn-active');
    });

    it('should ignore falsy values', () => {
      const result = cn('btn', false, null, undefined, 'btn-primary');
      expect(result).toContain('btn');
      expect(result).toContain('btn-primary');
      expect(result).not.toContain('false');
      expect(result).not.toContain('null');
    });

    it('should handle Tailwind class conflicts', () => {
      // Tailwind merge should handle conflicting classes
      const result = cn('p-4', 'p-8');
      // Should only keep p-8 (last one wins for conflicts)
      expect(result).toBe('p-8');
    });

    it('should merge array of classes', () => {
      const classes = ['btn', 'btn-primary', 'rounded'];
      const result = cn(...classes);
      expect(result).toContain('btn');
      expect(result).toContain('btn-primary');
      expect(result).toContain('rounded');
    });

    it('should work with empty inputs', () => {
      const result = cn();
      expect(result).toBe('');
    });
  });

  describe('formatJoinedDate', () => {
    it('returns fallback string if date is not provided', () => {
      expect(formatJoinedDate(null)).toBe('Joined recently');
      expect(formatJoinedDate(undefined)).toBe('Joined recently');
      expect(formatJoinedDate('')).toBe('Joined recently');
    });

    it('formats a regular date with "th" suffix (e.g. 4th, 11th)', () => {
      expect(formatJoinedDate('2023-05-04T00:00:00Z')).toBe(
        'Joined 4th May, 2023'
      );
      expect(formatJoinedDate('2023-05-11T00:00:00Z')).toBe(
        'Joined 11th May, 2023'
      );
    });

    it('formats a regular date with "st" suffix (e.g. 1st, 21st, 31st)', () => {
      expect(formatJoinedDate('2023-01-01T00:00:00Z')).toBe(
        'Joined 1st January, 2023'
      );
      expect(formatJoinedDate('2023-01-21T00:00:00Z')).toBe(
        'Joined 21st January, 2023'
      );
      expect(formatJoinedDate('2023-01-31T00:00:00Z')).toBe(
        'Joined 31st January, 2023'
      );
    });

    it('formats a date with "nd" suffix (e.g. 2nd, 22nd)', () => {
      expect(formatJoinedDate('2022-02-02T00:00:00Z')).toBe(
        'Joined 2nd February, 2022'
      );
      expect(formatJoinedDate('2022-02-22T00:00:00Z')).toBe(
        'Joined 22nd February, 2022'
      );
    });

    it('formats a date with "rd" suffix (e.g. 3rd, 23rd)', () => {
      expect(formatJoinedDate('2024-03-03T00:00:00Z')).toBe(
        'Joined 3rd March, 2024'
      );
      expect(formatJoinedDate('2024-03-23T00:00:00Z')).toBe(
        'Joined 23rd March, 2024'
      );
    });
  });
});
