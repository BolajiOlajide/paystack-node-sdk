import { z } from 'zod';

import { currencySchema } from './currency.schema';
import { customerSchema } from './customer.schema';
import { transactionSchema } from './transaction.schema';

export const createRefundArgsSchema = z.object({
  transaction: z.string({
    required_error: 'transaction is required',
    description: 'The transaction reference',
    invalid_type_error: 'transaction must be a string',
  }),
  amount: z
    .number({
      description: 'The amount to refund',
      invalid_type_error: 'amount must be a number',
    })
    .positive({
      message: 'amount must be a positive number',
    })
    .optional(),
  customer_note: z
    .string({
      description: 'The customer note',
      invalid_type_error: 'customer_note must be a string',
    })
    .optional(),
  merchant_note: z
    .string({
      description: 'The merchant note',
      invalid_type_error: 'merchant_note must be a string',
    })
    .optional(),
  currency: z
    .string({
      description: 'The currency',
      invalid_type_error: 'currency must be a string',
    })
    .optional(),
});
export type CreateRefundArgs = z.infer<typeof createRefundArgsSchema>;

const baseRefundSchema = z.object({
  updatedAt: z.string(),
  createdAt: z.string(),
  id: z.number(),
  amount: z.number(),
  currency: currencySchema,
  fully_deducted: z.union([z.boolean(), z.number()]),
  domain: z.string(),
  refunded_by: z.string(),
  status: z.string(),
  customer_note: z.string(),
  merchant_note: z.string(),
  deducted_amount: z.number(),
  integration: z.number(),
});

export const refundSchema = baseRefundSchema.extend({
  transaction: z.number(),
  dispute: z.any().nullable(),
  settlement: z.any().nullable(),
  currency: currencySchema,
  refunded_at: z.string().nullable(),
  bank_reference: z.string().nullable(),
  transaction_reference: z.string(),
  reason: z.string(),
  customer: customerSchema,
  refund_type: z.string(),
  transaction_amount: z.number(),
  initiated_by: z.string(),
  refund_channel: z.string().nullable(),
  session_id: z.string().nullable(),
  collect_account_number: z.boolean(),
});
export type Refund = z.infer<typeof refundSchema>;

export const newRefundSchema = baseRefundSchema.extend({
  transaction: transactionSchema,
  expected_at: z.string(),
  channel: z.string().nullable(),
});
export type NewRefund = z.infer<typeof newRefundSchema>;

export const listRefundsArgsSchema = z.object({
  transaction: z
    .string({
      required_error: 'transaction is required',
      description: 'The transaction reference',
      invalid_type_error: 'transaction must be a string',
    })
    .optional(),
  currency: currencySchema.optional(),

  from: z
    .string({
      required_error: 'from is required',
      description: 'A timestamp from which to start listing refund ',
      invalid_type_error: 'from must be a string',
    })
    .optional(),
  to: z
    .string({
      description: 'A timestamp at which to stop listing refunds',
      invalid_type_error: 'to must be a string',
    })
    .optional(),
  perPage: z
    .number({
      description:
        'Specify how many records you want to retrieve per page. If not specify we use a default value of 50.',
      invalid_type_error: 'perPage must be a number',
    })
    .optional(),
  page: z
    .number({
      required_error: 'page is required',
      description: 'Specify exactly what page you want to retrieve. If not specify we use a default value of 1.',
      invalid_type_error: 'page must be a number',
    })
    .optional(),
});
export type ListRefundsArgs = z.infer<typeof listRefundsArgsSchema>;

export const fetchRefundArgsSchema = z.object({
  id: z.string({
    required_error: 'id is required',
    description: 'The ID of the initiated refund',
    invalid_type_error: 'id must be a string',
  }),
});
export type FetchRefundArgs = z.infer<typeof fetchRefundArgsSchema>;
