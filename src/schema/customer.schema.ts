import { z } from 'zod';

import { authorizationSchema } from './authorization.schema';
import { createAPIResponseSchema } from './paystack.schema';
import { subscriptionSchema } from './subscription.schema';
import { transactionSchema } from './transaction.schema';

export const createCustomerArgsSchema = z.object({
  email: z
    .string({
      required_error: 'email is required',
      invalid_type_error: 'email must be a string',
      description: "Customer's email address",
    })
    .email({
      message: 'email must be a valid email address',
    })
    .nonempty({
      message: 'email must be a non-empty string',
    }),

  first_name: z
    .string({
      invalid_type_error: 'first_name must be a string',
      description: "Customer's first name",
    })
    .nonempty({
      message: 'first_name must be a non-empty string',
    })
    .optional(),

  last_name: z
    .string({
      invalid_type_error: 'last_name must be a string',
      description: "Customer's last name",
    })
    .nonempty({
      message: 'last_name must be a non-empty string',
    })
    .optional(),

  phone: z
    .string({
      invalid_type_error: 'phone must be a string',
      description: "Customer's phone number",
    })
    .nonempty()
    .optional(),

  metadata: z
    .record(z.any(), {
      invalid_type_error: 'metadata must be an object',
    })
    .optional(),
});
export type CreateCustomerArgs = z.infer<typeof createCustomerArgsSchema>;

const customerSchema = z.object({
  id: z.number().positive(),
  email: z.string().email(),
  integration: z.number(),
  domain: z.string(),
  customer_code: z.string(),
  risk_action: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  transactions: z.array(transactionSchema).optional(),
  subscriptions: z.array(subscriptionSchema).optional(),
  authorizations: z.array(authorizationSchema).optional(),
  identified: z.boolean().optional(),
  identifications: z.any().optional(),
  metadata: z.record(z.any()).optional().nullable(),
});
export type Customer = z.infer<typeof customerSchema>;

const createCustomerResponseSchema = createAPIResponseSchema(z.object({ data: customerSchema }));
export type CreateCustomerResponse = z.infer<typeof createCustomerResponseSchema>;

export const listCustomerArgsSchema = z.object({
  per_page: z.number().optional(),
});
export type ListCustomerArgs = z.infer<typeof listCustomerArgsSchema>;

export const listCustomersResponseSchema = createAPIResponseSchema(z.object({ data: z.array(customerSchema) }));
export type ListCustomersResponse = z.infer<typeof listCustomersResponseSchema>;

export const getCustomerArgsSchema = z.object({
  id: z.number(),
});
export type GetCustomerArgs = z.infer<typeof getCustomerArgsSchema>;
