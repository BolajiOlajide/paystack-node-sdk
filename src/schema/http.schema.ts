import { z } from 'zod';

export const httpClientSchema = z.object({
  baseUrl: z.string().trim().startsWith('https://', { message: 'must provide secure URL' }).optional(),
  secretKey: z.string().trim(),
});

export type httpClientArgs = z.infer<typeof httpClientSchema>;
