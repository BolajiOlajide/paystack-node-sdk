import { ZodError } from 'zod';

import { ValidationError } from './validation.error';

export const handleError = (err: unknown): Promise<never> => {
  if (err instanceof ZodError) {
    // We want to display Zod errors one at a time so we stick
    // to a similar format for returning errors.
    const [firstError] = err.errors;
    return Promise.reject(new ValidationError(firstError.message));
  }

  return Promise.reject(err);
};
