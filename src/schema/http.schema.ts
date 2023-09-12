import { z } from 'zod';

export const httpClientSchema = z.object({
  baseUrl: z.string().trim().startsWith('https://', { message: 'must provide secure URL' }).optional(),
  secretKey: z.string().trim(),
});

export type httpClientArgs = z.infer<typeof httpClientSchema>

const httpMethodSchema = z.enum(['GET', 'POST', 'PUT', 'DELETE', 'PATCH']);

export type httpMethod = z.infer<typeof httpMethodSchema>;

const requestArgsSchema = z.object({
  endpoint: z.string(),
  method: httpMethodSchema,
  // headers: z.nullable(z.object()),
});

export type requestArgs = z.infer<typeof requestArgsSchema>;
