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
      expect((error as HttpResponseValidationError).data).toEqual({
        name: 'John',
        age: '30',
      });
      expect((error as HttpResponseValidationError).error).toBeInstanceOf(z.ZodError);
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
      expect((error as HttpResponseValidationError).data).toEqual({
        name: 'John',
      });
      expect((error as HttpResponseValidationError).error).toBeInstanceOf(z.ZodError);
    }
  });

  it('should handle ZodArray schema', () => {
    const schema = z.array(z.string());
    const data = ['one', 'two', 123];

    try {
      parseHttpResponse(schema, data);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpResponseValidationError);
      expect((error as HttpResponseValidationError).data).toEqual(['one', 'two', 123]);
    }
  });

  it('should handle other Zod schemas', () => {
    const schema = z.string();
    const data = 123;

    try {
      parseHttpResponse(schema, data);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpResponseValidationError);
      expect((error as HttpResponseValidationError).data).toEqual(123);
    }
  });
});
