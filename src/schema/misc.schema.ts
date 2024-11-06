import { z } from 'zod';

import { countryNameSchema } from './country.schema';

export const listStatesArgsSchema = z.object({
  country: z.string({
    invalid_type_error: 'country must be a string',
    required_error: 'country is required',
    description: 'The country code of the states to list. It is gotten after the charge request.',
  }),
});
export type ListStatesArgs = z.infer<typeof listStatesArgsSchema>;

export const listBanksArgsSchema = z.object({
  country: countryNameSchema.optional(),
  pay_with_bank_transfer: z
    .boolean({
      invalid_type_error: 'pay_with_bank_transfer must be a boolean',
      description: 'A flag to filter for available banks a customer can make a transfer to complete a payment',
    })
    .optional(),
  pay_with_bank: z
    .boolean({
      invalid_type_error: 'pay_with_bank must be a boolean',
      description: 'A flag to filter for banks a customer can pay directly from',
    })
    .optional(),
  currency: z
    .string({
      invalid_type_error: 'currency must be a string',
    })
    .optional(),
  type: z
    .string({
      description:
        'Type of financial channel. For Ghanaian channels, please use either mobile_money for mobile money channels OR ghipps for bank channels',
      invalid_type_error: 'type must be a string',
    })
    .optional(),
  gateway: z
    .string({
      invalid_type_error: 'gateway must be a string',
      description: 'The gateway type of the bank. It can be one of these: [emandate, digitalbankmandate]',
    })
    .optional(),
  perPage: z
    .number({
      invalid_type_error: 'perPage must be a number',
      description: 'The number of objects to return per page. Defaults to 50, and limited to 100 records per page.',
    })
    .optional(),
});
export type ListBanksArgs = z.infer<typeof listBanksArgsSchema>;
