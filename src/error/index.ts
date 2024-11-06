import { ZodError } from 'zod';

import { ValidationError } from './validation.error';

export const handleModuleError = (err: unknown): Promise<never> => {
  if (err instanceof ZodError) {
    const [firstError] = err.errors;
    return Promise.reject(new ValidationError(firstError?.message ?? err.message));
  }
  return Promise.reject(err);
};
