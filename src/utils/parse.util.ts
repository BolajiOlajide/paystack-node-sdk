import { z } from 'zod';

import { HttpResponseValidationError } from '../error/validation.error';

/*
 * TODO: Currently not parsing the data because Paystack does not seem so consistent with their response objects.
 * This will likely throw most of the time.
 * Will revisit using this later.
 */
export const parseHttpResponse = <T>(schema: z.ZodType<T>, data: unknown): T => {
  const result = schema.safeParse(data);

  if (!result.success) {
    if (schema instanceof z.ZodObject) {
      const strippingSchema = z
        .object(
          Object.keys(schema.shape).reduce(
            (acc, key) => ({
              ...acc,
              [key]: z.any(),
            }),
            {}
          )
        )
        .strip();

      const strippedData = strippingSchema.parse(data);
      throw new HttpResponseValidationError(result.error, strippedData);
    } else if (schema instanceof z.ZodArray) {
      // Handle array validation
      const strippedData = z.array(z.any()).parse(data);
      throw new HttpResponseValidationError(result.error, strippedData);
    }

    // Fallback for other types
    throw new HttpResponseValidationError(result.error, data);
  }

  return result.data;
};
