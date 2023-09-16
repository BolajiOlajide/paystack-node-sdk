import { z } from 'zod';

export const currencySchema = z.enum(['NGN', 'USD', 'GHS', 'ZAR', 'KES'], {
  invalid_type_error: 'currency must be one of NGN, USD, GHS, ZAR or KES',
});
type Currency = z.infer<typeof currencySchema>;
