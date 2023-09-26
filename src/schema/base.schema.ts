import { z } from 'zod';

export const paystackSchema = z.object({
  secretKey: z.string({
    required_error: 'API key is required',
    invalid_type_error: 'API key must be a string',
  }),

  // You can set your payment URL here if you're using a proxy
  // for paystack. The default is https://api.paystack.co
  baseUrl: z.string().optional(),
});

export type PaystackArgs = z.infer<typeof paystackSchema>;

export const metaSchema = z.object({
  total: z.number(),
  skipped: z.number(),
  perPage: z.number(),
  page: z.number(),
  pageCount: z.number(),
});

export type Meta = z.infer<typeof metaSchema>;

const apiErrorResponseSchema = z.object({
  status: z.literal(false),
  message: z.string(),
});

export const apiSuccessResponseSchema = z.object({
  status: z.literal(true),
  message: z.string(),
  meta: metaSchema.optional(),
});

export const createAPIResponseSchema = <T extends z.AnyZodObject>(schema: T) =>
  apiErrorResponseSchema.or(apiSuccessResponseSchema.merge(schema));

export interface WithMeta<T> {
  data: T[];
  meta: Meta;
}
