import { z } from 'zod';

export class ValidationError extends Error {
  constructor(message: string) {
    super();
    this.name = 'ValidationError';
    this.message = message;
  }
}

export class HttpResponseValidationError extends Error {
  constructor(
    public readonly error: z.ZodError,
    public readonly data: unknown
  ) {
    super('Validation failed');
    this.name = 'ValidationError';
  }
}
