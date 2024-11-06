import type { HTTPResponse } from '../_types';
import { handleError } from '../error';
import type { HttpClient } from '../http';

export class Base {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  protected async _get<T>(url: string): HTTPResponse<T> {
    try {
      const resp = await this.httpClient.get<T>(url);
      return resp as HTTPResponse<T>;
    } catch (err) {
      return handleError(err);
    }
  }

  protected async _post<T, U extends Record<string, any>>(url: string, data: U): HTTPResponse<T> {
    try {
      const resp = await this.httpClient.post<T, U>(url, data);
      return resp as HTTPResponse<T>;
    } catch (err) {
      return handleError(err);
    }
  }

  protected async _put<T, U extends Record<string, any>>(url: string, data: U): HTTPResponse<T> {
    try {
      const resp = await this.httpClient.put<T, U>(url, data);
      return resp as HTTPResponse<T>;
    } catch (err) {
      return handleError(err);
    }
  }
}
