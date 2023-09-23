import { z } from 'zod';

import { authorizationSchema } from './authorization.schema';
import { identificationSchema } from './identification.schema';
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
    .nullish(),

  last_name: z
    .string({
      invalid_type_error: 'last_name must be a string',
      description: "Customer's last name",
    })
    .nonempty({
      message: 'last_name must be a non-empty string',
    })
    .nullish(),

  phone: z
    .string({
      invalid_type_error: 'phone must be a string',
      description: "Customer's phone number",
    })
    .nonempty()
    .nullish(),

  metadata: z
    .record(z.any(), {
      invalid_type_error: 'metadata must be an object',
    })
    .nullish(),
});
export type CreateCustomerArgs = z.infer<typeof createCustomerArgsSchema>;

// allow to whitelist. deny to blacklist. Customers start with a default risk action.
const riskActionSchema = z.enum(['allow', 'deny', 'default'], {
  invalid_type_error: 'risk_action must be one of allow, deny or default',
  required_error: 'risk_action is required',
});
type RiskAction = z.infer<typeof riskActionSchema>;

const customerSchema = z.object({
  id: z.number().positive(),
  email: z.string().email(),
  integration: z.number(),
  domain: z.string(),
  customer_code: z.string(),
  risk_action: riskActionSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
  first_name: z.string().nullish(),
  last_name: z.string().nullish(),
  phone: z.string().nullish(),
  transactions: z.array(transactionSchema).optional(),
  subscriptions: z.array(subscriptionSchema).optional(),
  authorizations: z.array(authorizationSchema).optional(),
  identified: z.boolean().optional(),
  identifications: z.array(identificationSchema).optional(),
  metadata: z.record(z.any()).nullish(),
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

export const validateCustomerArgsSchema = z.object({
  code: z.string({
    description: "customer's code",
    invalid_type_error: 'code must be a string',
    required_error: 'code is required',
  }),
  type: z.literal('bank_account', {
    description: 'Predefined types of identification. Only bank_account is supported at the moment',
    invalid_type_error: 'only `bank_account` is supported for type',
    required_error: 'type is required',
  }),
  country: z
    .string({
      description: '2 letter country code of identification issuer',
      required_error: 'country is required',
      invalid_type_error: 'country must be a string',
    })
    .length(2, {
      message: 'Country code must be a valid 2 character country code',
    }),
  // Once we have other types, account_number and bank_code should be optional and only be required
  // if `type = bank_account`.
  account_number: z.string({
    required_error: 'account_number is required',
    invalid_type_error: 'account_number must be a string',
    description: "Customer's bank account number. (required if type is bank_account)",
  }),
  bank_code: z.string({
    required_error: 'bank_code is required',
    invalid_type_error: 'bank_code must be a string',
  }),
  bvn: z
    .string({
      required_error: 'bvn is required',
      invalid_type_error: 'bvn must be a string',
    })
    .length(11, {
      message: 'BVN must be 11 digit',
    }),
  middle_name: z
    .string({
      invalid_type_error: 'middle_name must be a string',
    })
    .nullish(),
  last_name: z
    .string({
      invalid_type_error: 'last_name must be a string',
    })
    .nullish(),
  first_name: z.string({
    invalid_type_error: 'first_name must be a string',
    required_error: 'first_name is required',
  }),
  value: z
    .string({
      invalid_type_error: 'value must be a string',
    })
    .optional(),
});
export type ValidateCustomerArgs = z.infer<typeof validateCustomerArgsSchema>;

const validateCustomerResponseSchema = createAPIResponseSchema(z.object({}));
export type ValidateCustomerResponse = z.infer<typeof validateCustomerResponseSchema>;

export const whitelistOrBlacklistArgsSchema = z.object({
  customer: z.string({
    invalid_type_error: 'customer must be a string',
    required_error: 'customer is required',
  }),
  risk_action: riskActionSchema.optional(),
});
export type WhitelistOrBlacklistArgs = z.infer<typeof whitelistOrBlacklistArgsSchema>;

const whitelistOrBlacklistResponseSchema = createAPIResponseSchema(z.object({ data: customerSchema }));
export type WhitelistOrBlacklistResponse = z.infer<typeof whitelistOrBlacklistResponseSchema>;

export const deactivateAuthorizationArgsSchema = z.object({
  authorization_code: z.string({
    description: 'Authorization code to be deactivated',
    invalid_type_error: 'authorization_code must be a string',
    required_error: 'authorization_code is required',
  }),
});
export type DeactivateAuthorizationArgs = z.infer<typeof deactivateAuthorizationArgsSchema>;
