import { z } from 'zod';

export const identificationSchema = z.object({
  country: z.string(),
  value: z.string(),
  type: z.string(),
});
