import { z } from 'zod';

import { handleError } from '../error';
import { createAPIResponseSchema, apiSuccessResponseSchema, type WithMeta } from '../schema/base.schema';
import { isNonErrorResponse } from '../utils/status.util';
import type { HttpClient } from '../http';

const responseSchema = createAPIResponseSchema(z.object({ data: z.unknown() }));
type Response = z.infer<typeof responseSchema>;

const successResponseSchema = apiSuccessResponseSchema.merge(z.object({ data: z.unknown() }));
type SuccessResponse = z.infer<typeof successResponseSchema>;

export class Base {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async get<T>(url: string): Promise<T> {
    try {
      const resp = await this.httpClient.get(url);
      return resp as T;
    } catch (err) {
      return handleError(err);
    }
  }

  // private async _wrap(f: () => Promise<AxiosResponse<Response>>): Promise<SuccessResponse> {
  //   const { data, status: statusCode } = await f();

  //   if (data.status && isNonErrorResponse(statusCode)) {
  //     return data;
  //   }

  //   return Promise.reject({ message: data.message });
  // }

  // async wrap<T>(f: () => Promise<AxiosResponse<Response>>): Promise<T> {
  //   try {
  //     const resp = await this._wrap(f);
  //     return resp.data as T;
  //   } catch (err) {
  //     return handleError(err);
  //   }
  // }

  // async wrapWithMeta<T>(f: () => Promise<AxiosResponse<Response>>): Promise<WithMeta<T>> {
  //   try {
  //     const resp = await this._wrap(f);
  //     return { data: resp.data as T[], meta: resp.meta } as WithMeta<T>;
  //   } catch (err) {
  //     return handleError(err);
  //   }
  // }
}
