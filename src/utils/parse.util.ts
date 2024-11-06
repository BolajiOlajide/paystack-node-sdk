import { z } from 'zod';

import { HttpResponseValidationError } from '../error/validation.error';

export const parseHttpResponse = <T, U>(schema: z.ZodType<T>, data: U): U => {
  const result = schema.safeParse(data);

  // if (!result.success) {
  //   // Strip unwanted properties but keep original values
  //   const strippingSchema = z
  //     .object(
  //       Object.keys(schema.shape).reduce(
  //         (acc, key) => ({
  //           ...acc,
  //           [key]: z.any(),
  //         }),
  //         {}
  //       )
  //     )
  //     .strip();

  //   const strippedData = strippingSchema.parse(data);
  //   // Decide if to throw error or just return the stripped data.
  //   console.log('error', result.error);
  //   // throw new HttpResponseValidationError(result.error, strippedData);
  // }

  return data;
};
