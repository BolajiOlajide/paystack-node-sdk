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

export const stateSchema = z.object({
  name: z.string(),
  slug: z.string(),
  abbreviation: z.string(),
});
export type State = z.infer<typeof stateSchema>;

export const countryNameSchema = z.enum(['nigeria', 'ghana', 'kenya', 'south africa']);
export type CountryName = z.infer<typeof countryNameSchema>;
