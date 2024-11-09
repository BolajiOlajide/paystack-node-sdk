import { z } from 'zod';

export const currencySchema = z.enum(['NGN', 'USD', 'GHS', 'ZAR', 'KES'], {
  invalid_type_error: 'currency must be one of NGN, USD, GHS, ZAR or KES',
  required_error: 'currency is required',
  description: 'The currency of the transaction',
});

export type Currency = z.infer<typeof currencySchema>;
