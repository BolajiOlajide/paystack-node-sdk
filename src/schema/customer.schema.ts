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

export const listCustomerArgsSchema = z
  .object({
    per_page: z
      .number({
        invalid_type_error: 'per_page must be a number',
        description: 'Number of customers to return per page. Default is 50',
      })
      .default(50)
      .optional(),
    page: z
      .number({
        invalid_type_error: 'page must be a number',
        description: 'Page number for paginated results. Default is 1',
      })
      .default(1)
      .optional(),
    from: z.coerce
      .date({
        invalid_type_error: 'from is not a valid date',
        description: 'A timestamp from which to start listing customers',
      })
      .optional(),
    to: z.coerce
      .date({
        invalid_type_error: 'to is not a valid date',
        description: 'A timestamp from which to stop listing customers',
      })
      .optional(),
  })
  .optional();
export type ListCustomerArgs = z.infer<typeof listCustomerArgsSchema>;

const listCustomersResponseSchema = createAPIResponseSchema(z.object({ data: z.array(customerSchema) }));
export type ListCustomersResponse = z.infer<typeof listCustomersResponseSchema>;

export const getCustomerArgsSchema = z.object({
  email_or_code: z.string({
    invalid_type_error: 'email_or_code must be string',
    required_error: 'email_or_code is required',
    description: 'an email or customer code for the customer you want to fetch',
  }),
});
export type GetCustomerArgs = z.infer<typeof getCustomerArgsSchema>;

const getCustomerResponseSchema = createAPIResponseSchema(z.object({ data: z.array(customerSchema) }));
export type GetCustomerResponse = z.infer<typeof getCustomerResponseSchema>;

export const updateCustomerArgsSchema = z
  .object({
    code: z.string({
      description: "customer's code",
      invalid_type_error: 'code must be a string',
      required_error: 'code is required',
    }),
  })
  .and(
    // We add a refinement here because we want to validate that the user
    // provides at least one field to update.
    // This is because all the other fields asides `code` are optional so we need
    // a way to verfy that atleat one field is provided for update.
    createCustomerArgsSchema.omit({ email: true }).refine((data) => Object.keys(data).length > 0, {
      message: 'At least one field is required to update',
    })
  );
export type UpdateCustomerArgs = z.infer<typeof updateCustomerArgsSchema>;

const updateCustomerResponseSchema = createAPIResponseSchema(z.object({ data: z.array(customerSchema) }));
export type UpdateCustomerResponse = z.infer<typeof updateCustomerResponseSchema>;
