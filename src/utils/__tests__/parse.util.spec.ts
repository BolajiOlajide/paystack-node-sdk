import { describe, expect, it } from 'vitest';
import { z } from 'zod';

import { HttpResponseValidationError } from '../../error/validation.error';
import { parseHttpResponse } from '../parse.util';

describe('parseHttpResponse', () => {
  it('should parse valid data', () => {
    const schema = z.object({
      name: z.string(),
      age: z.number(),
    });
    const data = {
      name: 'John',
      age: 30,
    };

    const result = parseHttpResponse(schema, data);
    expect(result).toEqual(data);
  });

  it('should throw ValidationError with stripped data for invalid data', () => {
    const schema = z.object({
      name: z.string(),
      age: z.number(),
    });

    const data = {
      name: 'John',
      age: '30',
      address: '123 Main St',
    };

    expect(() => {
      parseHttpResponse(schema, data);
    }).toThrow(HttpResponseValidationError);

    try {
      parseHttpResponse(schema, data);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpResponseValidationError);
      expect(error.data).toEqual({
        name: 'John',
        age: '30', // Original invalid value
      });
      expect(error.error).toBeInstanceOf(z.ZodError);
    }
  });

  it('should throw ValidationError with stripped data for invalid data', () => {
    const schema = z.object({
      name: z.string(),
      age: z.number(),
    });

    const data = {
      name: 'John',
      address: '123 Main St',
    };

    expect(() => {
      parseHttpResponse(schema, data);
    }).toThrow(HttpResponseValidationError);

    try {
      parseHttpResponse(schema, data);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpResponseValidationError);
      expect(error.data).toEqual({
        name: 'John',
      });
      expect(error.error).toBeInstanceOf(z.ZodError);
    }
  });
});
