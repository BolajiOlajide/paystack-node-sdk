import { z } from 'zod';

import { createAPIResponseSchema } from './paystack.schema';

const planIntervalSchema = z.enum(['hourly', 'daily', 'weekly', 'monthly', 'quarterly', 'bianually', 'annually'], {
  description: 'The interval at which to charge subscriptions on this plan.',
  required_error: 'interval is required',
  invalid_type_error: 'interval must be one of (hourly, daily, weekly, monthly, quarterly, bianually, annually)',
});

export const createPlanArgsSchema = z.object({
  name: z
    .string({
      description: 'The name of the plan',
      required_error: 'name is required',
      invalid_type_error: 'name must be a string',
    })
    .nonempty({
      message: 'name must be a non-empty string',
    }),

  amount: z
    .number({
      description: 'The amount to charge',
      required_error: 'amount is required',
      invalid_type_error: 'amount must be a number',
    })
    .positive({
      message: 'amount must be greater than 0',
    }),

  // The interval at which to charge subscriptions on this plan.
  // Available options are hourly, daily, weekly, monthly, quarterly, biannually (every 6 months) and annually
  interval: planIntervalSchema,

  // You can also pass invoice_limit, which lets you set how many times a customer can be charged on this plan.
  // So if you set invoice_limit: 5 on a monthly plan, then the customer will be charged every month, for 5 months.
  // If you don't pass invoice_limit, Paystack will continue to charge the customer until the plan is cancelled.
  invoice_limit: z
    .number({
      description: 'This indicates how many times a customer can be charged on this plan',
      invalid_type_error: 'invoice_limit must be a number',
    })
    .positive({
      message: 'invoice_limit must be greater than 0',
    })
    .optional(),
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
