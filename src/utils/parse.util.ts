import { z } from 'zod';

import { HttpResponseValidationError } from '../error/validation.error';

export const parseHttpResponse = <T>(schema: z.ZodType<T>, data: unknown): T => {
  const result = schema.safeParse(data);

  if (!result.success) {
    // Strip unwanted properties but keep original values
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
  }

  return result.data;
};
