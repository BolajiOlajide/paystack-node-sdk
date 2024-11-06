import type { HTTPResponse } from '../_types';
import { NotFoundError } from '../error/notfound.error';
import { RateLimitError } from '../error/ratelimit.error';
import { UnauthorizedError } from '../error/unauthorized.error';
import { StatusCodes } from '../utils/status.util';
import { trimTrailingSlash, trimLeadingSlash } from '../utils/trim.util';

export class HttpClient {
  private baseUrl: string;
  private secretKey: string;
  private headers: HeadersInit;

  constructor(baseUrl: string, secretKey: string) {
    this.baseUrl = trimTrailingSlash(baseUrl);
    this.secretKey = secretKey;
    this.headers = {
      Authorization: `Bearer ${secretKey}`,
      'Content-Type': 'application/json',
    };
  }

  private computeUrl(url: string): string {
    const trimmedUrl = trimLeadingSlash(url);
    return `${this.baseUrl}/${trimmedUrl}`;
  }

  private handleNotOKResponse(errBody: any, status: number): Error {
    if (errBody.status) {
      return new Error(errBody.message);
    }

    const errMessage = errBody.message;
    switch (status) {
      case StatusCodes.TOO_MANY_REQUESTS:
        // TODO (@BolajiOlajide): Surface more info about the rate limit status
        return new RateLimitError(`rate limit reached. ${errMessage}`);
      case StatusCodes.UNAUTHORIZED:
        return new UnauthorizedError(errMessage);
      case StatusCodes.NOT_FOUND:
        return new NotFoundError(errMessage);
      default:
        return new Error(`HTTP error! status: ${status} ${errMessage}`);
    }
  }

  async get<T>(url: string): Promise<T> {
    const response = await fetch(this.computeUrl(url), {
      headers: this.headers,
    });
    const body = await response.json();
    if (!response.ok) {
      return Promise.reject(this.handleNotOKResponse(body, response.status));
    }
    return body;
  }

  async post<T, U extends Record<string, any>>(url: string, data: U): Promise<T> {
    const response = await fetch(this.computeUrl(url), {
      method: 'POST',
      body: JSON.stringify(data),
      headers: this.headers,
    });
    const body = await response.json();
    if (!response.ok) {
      return Promise.reject(this.handleNotOKResponse(body, response.status));
    }
    return body;
  }

  async put<T, U extends Record<string, any>>(url: string, data: U): Promise<T> {
    const response = await fetch(this.computeUrl(url), {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: this.headers,
    });
    const body = await response.json();
    if (!response.ok) {
      return Promise.reject(this.handleNotOKResponse(body, response.status));
    }
    return body;
  }
}
