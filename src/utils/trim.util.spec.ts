import { trimLeadingSlash, trimTrailingSlash } from './trim.util';

describe('trimUtil', () => {
  describe('trimTrailingSlash', () => {
    it('should trim trailing slashes', () => {
      expect(trimTrailingSlash('abc/')).toBe('abc');
      expect(trimTrailingSlash('abc//')).toBe('abc');
    });

    it('should not modify string without trailing slashes', () => {
      expect(trimTrailingSlash('abc')).toBe('abc');
    });

    it('should handle empty string', () => {
      expect(trimTrailingSlash('')).toBe('');
    });
  });

  describe('trimLeadingSlash', () => {
    it('should trim leading slashes', () => {
      expect(trimLeadingSlash('/abc')).toBe('abc');
      expect(trimLeadingSlash('//abc')).toBe('abc');
    });

    it('should not modify string without leading slashes', () => {
      expect(trimLeadingSlash('abc')).toBe('abc');
    });

    it('should handle empty string', () => {
      expect(trimLeadingSlash('')).toBe('');
    });
  });
});
