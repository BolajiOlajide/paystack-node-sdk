import type { AxiosInstance, AxiosResponse } from 'axios';
import { z } from 'zod';

import { handleError } from '../error';
import { createAPIResponseSchema, type Meta, apiSuccessResponseSchema, type WithMeta } from '../schema/base.schema';
import { isNonErrorResponse } from '../utils/status.util';

const responseSchema = createAPIResponseSchema(z.object({ data: z.unknown() }));
type Response = z.infer<typeof responseSchema>;

const successResponseSchema = apiSuccessResponseSchema.merge(z.object({ data: z.unknown() }));
type SuccessResponse = z.infer<typeof successResponseSchema>;

class Base {
  public httpClient: AxiosInstance;

  constructor(httpClient: AxiosInstance) {
    this.httpClient = httpClient;
  }

  private async _wrap(f: () => Promise<AxiosResponse<Response>>): Promise<SuccessResponse> {
    const { data, status: statusCode } = await f();

    if (data.status && isNonErrorResponse(statusCode)) {
      return data;
    }

    return Promise.reject({ message: data.message });
  }

  async wrap<T>(f: () => Promise<AxiosResponse<Response>>): Promise<T> {
    try {
      const resp = await this._wrap(f);
      return resp.data as T;
    } catch (err) {
      return handleError(err);
    }
  }

  async wrapWithMeta<T>(f: () => Promise<AxiosResponse<Response>>): Promise<WithMeta<T>> {
    try {
      const resp = await this._wrap(f);
      return { data: resp.data as T[], meta: resp.meta } as WithMeta<T>;
    } catch (err) {
      return handleError(err);
    }
  }
}

export default Base;
