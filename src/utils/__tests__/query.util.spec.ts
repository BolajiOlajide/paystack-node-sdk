import { describe, expect, test } from 'vitest';

import { createQueryForURL } from '../query.util';

describe('createQueryForURL', () => {
  test('should create a query string from an object', () => {
    const query = createQueryForURL('https://example.com', { a: 1, b: 2 });
    expect(query).toBe('https://example.com?a=1&b=2');
  });

  test('should return the URL if no object is provided', () => {
    const query = createQueryForURL('https://example.com', {});
    expect(query).toBe('https://example.com');
  });
});
