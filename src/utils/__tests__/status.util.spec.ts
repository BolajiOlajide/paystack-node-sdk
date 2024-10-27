import { describe, expect, it } from 'vitest';

import { isNonErrorResponse } from '../status.util';

describe('statusUtil', () => {
  describe('isNonErrorResponse', () => {
    it('should return true for status codes >= 100 and < 400', () => {
      expect(isNonErrorResponse(100)).toBe(true);
      expect(isNonErrorResponse(200)).toBe(true);
      expect(isNonErrorResponse(300)).toBe(true);
    });

    it('should return false for status codes >= 400', () => {
      expect(isNonErrorResponse(400)).toBe(false);
      expect(isNonErrorResponse(500)).toBe(false);
      expect(isNonErrorResponse(600)).toBe(false);
    });
  });
});
