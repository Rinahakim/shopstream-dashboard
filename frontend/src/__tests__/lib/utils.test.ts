import { describe, it, expect } from 'vitest';
import { cn, formatCurrency, formatDate, formatShortDate } from '@/lib/utils';

describe('Utils', () => {
  describe('cn (className merger)', () => {
    it('should merge class names', () => {
      expect(cn('foo', 'bar')).toBe('foo bar');
    });

    it('should handle conditional classes', () => {
      expect(cn('base', true && 'active', false && 'hidden')).toBe('base active');
    });

    it('should merge tailwind classes correctly', () => {
      // tailwind-merge should handle conflicting classes
      expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4');
    });

    it('should handle undefined and null values', () => {
      expect(cn('base', undefined, null, 'end')).toBe('base end');
    });
  });

  describe('formatCurrency', () => {
    it('should format positive numbers as USD currency', () => {
      expect(formatCurrency(1234.56)).toBe('$1,234.56');
    });

    it('should format zero', () => {
      expect(formatCurrency(0)).toBe('$0.00');
    });

    it('should format large numbers with commas', () => {
      expect(formatCurrency(1000000)).toBe('$1,000,000.00');
    });

    it('should handle decimal precision', () => {
      expect(formatCurrency(99.999)).toBe('$100.00');
    });
  });

  describe('formatDate', () => {
    it('should format date string to readable format in English', () => {
      const result = formatDate('2024-12-28T14:30:00.000Z', 'en');
      // Format: "Dec 28, 2024"
      expect(result).toContain('Dec');
      expect(result).toContain('28');
      expect(result).toContain('2024');
    });

    it('should format date string in Hebrew', () => {
      const result = formatDate('2024-12-28T14:30:00.000Z', 'he');
      expect(result).toContain('28');
      expect(result).toContain('2024');
    });

    it('should handle different date formats', () => {
      const result = formatDate('2024-01-15');
      expect(result).toContain('Jan');
      expect(result).toContain('15');
    });
  });

  describe('formatShortDate', () => {
    it('should format date without year in English', () => {
      const result = formatShortDate('2024-12-28', 'en');
      expect(result).toContain('Dec');
      expect(result).toContain('28');
      expect(result).not.toContain('2024');
    });

    it('should format date without year in Hebrew', () => {
      const result = formatShortDate('2024-12-28', 'he');
      expect(result).toContain('28');
    });
  });
});

