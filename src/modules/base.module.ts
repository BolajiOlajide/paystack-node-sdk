import type { HTTPResponse } from '../_types';
import type { HttpClient } from '../http';

export class Base {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  protected async _get<T>(url: string): HTTPResponse<T> {
    const resp = await this.httpClient.get<T>(url);
    return resp as HTTPResponse<T>;
  }

  protected async _post<T, U extends Record<string, any>>(url: string, data: U): HTTPResponse<T> {
    const resp = await this.httpClient.post<T, U>(url, data);
    return resp as HTTPResponse<T>;
  }

  protected async _put<T, U extends Record<string, any>>(url: string, data: U): HTTPResponse<T> {
    const resp = await this.httpClient.put<T, U>(url, data);
    return resp as HTTPResponse<T>;
  }
}
