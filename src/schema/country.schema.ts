import { z } from 'zod';

export const countrySchema = z.object({
  id: z.number(),
  active_for_dashboard_onboarding: z.boolean(),
  name: z.string(),
  iso_code: z.string(),
  default_currency_code: z.string(),
  integration_defaults: z.record(z.string(), z.any()),
  calling_code: z.string(),
  pilot_mode: z.boolean(),
  relationships: z.record(z.string(), z.any()),
});
export type Country = z.infer<typeof countrySchema>;
