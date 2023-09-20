import { AxiosResponse } from 'axios';
import { z } from 'zod';

import { handleError } from '../error';
import { createAPIResponseSchema } from '../schema/paystack.schema';
import { isNonErrorResponse } from '../utils/status.util';


const responseSchema = createAPIResponseSchema(z.object({ data: z.unknown() }));
type Response = z.infer<typeof responseSchema>;

class Base {
  async wrap<T, R extends Response>(f: () => Promise<AxiosResponse<R>>): Promise<T> {
    try {
      const { data, status } = await f();

      if (data.status && isNonErrorResponse(status)) {
        return data.data as T;
      }

      return Promise.reject({ message: data.message });
    } catch (err) {
      return handleError(err);
    }
  }
}

export default Base;
