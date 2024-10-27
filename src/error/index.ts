import { AxiosError } from 'axios';
import { ZodError } from 'zod';

import { StatusCodes } from '../utils/status.util';

import { APIError } from './api.error';
import { NotFoundError } from './notfound.error';
import { RateLimitError } from './ratelimit.error';
import { UnauthorizedError } from './unauthorized.error';
import { ValidationError } from './validation.error';

export const handleError = (err: unknown): Promise<never> => {
  if (err instanceof ZodError) {
    // We want to display Zod errors one at a time, so we stick
    // to a similar format for returning errors.
    const [firstError] = err.errors;
    return Promise.reject(new ValidationError(firstError?.message ?? err.message));
  } else if (err instanceof AxiosError) {
    // Handle API errors (most likely from Paystack's API)
    if (err.response) {
      const { status, data } = err.response;
      switch (status) {
        case StatusCodes.UNAUTHORIZED:
          return Promise.reject(new UnauthorizedError('invalid secret key'));
        case StatusCodes.TOO_MANY_REQUESTS:
          return Promise.reject(new RateLimitError('too many requests'));
        case StatusCodes.NOT_FOUND:
          return Promise.reject(new NotFoundError('resource not found'));
        default:
          return Promise.reject(new APIError(data.message));
      }
    }
  }

  return Promise.reject(err);
};
