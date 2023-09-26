import { z } from 'zod';

import { createAPIResponseSchema } from './base.schema';
import { countrySchema } from './country.schema';

const listCountryResponseSchema = createAPIResponseSchema(z.object({ data: z.array(countrySchema) }));
export type ListCountryResponse = z.infer<typeof listCountryResponseSchema>;
