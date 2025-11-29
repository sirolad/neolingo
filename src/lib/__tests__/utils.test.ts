import { describe, it, expect } from 'vitest';
import { cn } from '../utils';

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
});
