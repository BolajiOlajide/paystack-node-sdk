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
  transactions: z.array(transactionSchema),
  subscriptions: z.array(subscriptionSchema),
  authorizations: z.array(authorizationSchema),
  email: z.string().email(),
  integration: z.number(),
  domain: z.string(),
  customer_code: z.string(),
  risk_action: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  identified: z.boolean(),
  identifications: z.any(),
});
export type Customer = z.infer<typeof customerSchema>;

const createCustomerResponseSchema = createAPIResponseSchema(z.object({ data: customerSchema }));
export type CreateCustomerResponse = z.infer<typeof createCustomerResponseSchema>;
