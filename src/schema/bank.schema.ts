import { z } from 'zod';

export const bankSchema = z.object({
  id: z.number().positive(),
  name: z.string(),
  slug: z.string(),
  code: z.string(),
  longcode: z.string(),
  gateway: z.string().nullable(),
  pay_with_bank: z.boolean(),
  active: z.boolean(),
  country: z.string(),
  currency: z.string(),
  type: z.string(),
  is_deleted: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type Bank = z.infer<typeof bankSchema>;
