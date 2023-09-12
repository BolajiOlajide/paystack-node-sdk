import { z } from 'zod';

export const paystackSchema = z.object({
  apiKey: z.string({
    required_error: 'API key is required',
    invalid_type_error: 'API key must be a string',
  }),
});
