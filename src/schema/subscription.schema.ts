import { z } from 'zod';

import { createAPIResponseSchema } from './paystack.schema';

const planIntervalSchema = z.enum(['hourly', 'daily', 'weekly', 'monthly', 'quarterly', 'bianually', 'annually']);

export const createPlanArgsSchema = z.object({
  name: z.string(),
  amount: z.number().positive(),
  interval: planIntervalSchema,
});
export type CreatePlanArgs = z.infer<typeof createPlanArgsSchema>;

const planSchema = z.object({
  name: z.string(),
  interval: planIntervalSchema,
  amount: z.number().positive(),
  integration: z.number(),
  domain: z.string(),
  currency: z.string(),
  plan_code: z.string(),
  invoice_limit: z.number().positive(),
  send_invoices: z.boolean(),
  send_sms: z.boolean(),
  hosted_page: z.boolean(),
  migrate: z.boolean(),
  is_archived: z.boolean(),
  id: z.number().positive(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type Plan = z.infer<typeof planSchema>;

export const createPlanResponseSchema = createAPIResponseSchema(z.object({ data: planSchema }));
export type CreatePlanResponse = z.infer<typeof createPlanResponseSchema>;
