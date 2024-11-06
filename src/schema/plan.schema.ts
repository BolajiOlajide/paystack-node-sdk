import { z } from 'zod';

import { currencySchema } from './currency.schema';

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

  description: z
    .string({
      invalid_type_error: 'description must be a string',
      description: 'A description for this plan',
    })
    .nonempty({
      message: 'description must be a non-empty string',
    })
    .optional(),

  send_invoices: z
    .boolean({
      invalid_type_error: 'send_invoices must be a boolean',
      description: "Set to false if you don't want invoices to be sent to your customers",
    })
    .optional(),

  send_sms: z
    .boolean({
      invalid_type_error: 'send_sms must be a boolean',
      description: "Set to false if you don't want text messages to be sent to your customers",
    })
    .optional(),

  currency: currencySchema.optional(),
});
export type CreatePlanArgs = z.infer<typeof createPlanArgsSchema>;

export const planSchema = z.object({
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
  hosted_page_url: z.string().nullish(),
  hosted_page_summary: z.any().nullish(),
  migrate: z.boolean(),
  is_archived: z.boolean(),
  is_deleted: z.boolean().optional(),
  id: z.number().positive(),
  createdAt: z.string(),
  updatedAt: z.string(),
  total_subscriptions_revenue: z.number().positive().optional(),
  subscribers: z.array(z.any()).optional(),
  description: z.string().nullish(),
  pages: z.array(z.any()).optional(),
  subscriptions: z.array(z.any()).optional(),
  total_subscriptions: z.number().positive().optional(),
  active_subscriptions: z.number().positive().optional(),
});
export type Plan = z.infer<typeof planSchema>;

export const listPlanArgsSchema = z
  .object({
    perPage: z.number().optional(),
    page: z.number().optional(),
    status: z.string().optional(),
    interval: planIntervalSchema.optional(),
    amount: z.number().positive().optional(),
  })
  .optional();
export type ListPlanArgs = z.infer<typeof listPlanArgsSchema>;

export const updatePlanArgsSchema = z.object({
  id_or_code: z.string(),
  name: z.string(),
  amount: z.number().positive(),
  interval: planIntervalSchema,
  description: z.string().optional(),
  send_invoices: z.boolean().optional(),
  send_sms: z.boolean().optional(),
  invoice_limit: z.number().positive().optional(),
  currency: currencySchema.optional(),
});
export type UpdatePlanArgs = z.infer<typeof updatePlanArgsSchema>;
