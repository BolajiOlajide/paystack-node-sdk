import { BadRequestError } from '../error/badrequest.error';
import { ForbiddenError } from '../error/forbidden.error';
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
      Authorization: `Bearer ${this.secretKey}`,
      'Content-Type': 'application/json',
    };
  }

  private computeUrl(url: string): string {
    const trimmedUrl = trimLeadingSlash(url);
    return `${this.baseUrl}/${trimmedUrl}`;
  }

  private async handleNotOKResponse(response: Response): Promise<Error> {
    const contentLength = response.headers.get('Content-Length');
    let errMessage: string = '';
    if (contentLength !== '0') {
      const errBody = await response.json();
      errMessage = errBody.message;
    }

    switch (response.status) {
      case StatusCodes.TOO_MANY_REQUESTS:
        // TODO (@BolajiOlajide): Surface more info about the rate limit status
        return new RateLimitError(`rate limit reached. ${errMessage}`);
      case StatusCodes.UNAUTHORIZED:
        return new UnauthorizedError(errMessage);
      case StatusCodes.NOT_FOUND:
        return new NotFoundError(errMessage);
      case StatusCodes.BAD_REQUEST:
        return new BadRequestError(errMessage);
      case StatusCodes.FORBIDDEN:
        return new ForbiddenError(errMessage);
      default:
        return new Error(`HTTP error! status: ${response.status} ${errMessage}`);
    }
  }

  async get<T>(url: string): Promise<T> {
    const response = await fetch(this.computeUrl(url), {
      headers: this.headers,
    });
    if (!response.ok) {
      const err = await this.handleNotOKResponse(response);
      return Promise.reject(err);
    }
    return response.json();
  }

  async post<T, U extends Record<string, any>>(url: string, data: U): Promise<T> {
    const response = await fetch(this.computeUrl(url), {
      method: 'POST',
      body: JSON.stringify(data),
      headers: this.headers,
    });
    if (!response.ok) {
      const err = await this.handleNotOKResponse(response);
      return Promise.reject(err);
    }
    return response.json();
  }

  async put<T, U extends Record<string, any>>(url: string, data: U): Promise<T> {
    const response = await fetch(this.computeUrl(url), {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: this.headers,
    });
    if (!response.ok) {
      const err = await this.handleNotOKResponse(response);
      return Promise.reject(err);
    }
    return response.json();
  }
}
