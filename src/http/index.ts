import { trimTrailingSlash, trimLeadingSlash } from "../utils/trim.util";

export class HttpClient {
  private baseUrl: string;
  private secretKey: string;
  private headers: HeadersInit;

  constructor(baseUrl: string, secretKey: string) {
    this.baseUrl = trimTrailingSlash(baseUrl);
    this.secretKey = secretKey;
    this.headers = {
      'Authorization': `Bearer ${secretKey}`,
      'Content-Type': 'application/json',
    };
  }

  private computeUrl(url: string): string {
    const trimmedUrl = trimLeadingSlash(url);
    return `${this.baseUrl}/${trimmedUrl}`;
  }

  async get(url: string) {
    const response = await fetch(this.computeUrl(url), {
      headers: this.headers,
    });
    if (!response.ok) {
      // Custom error thrown. And return details from response.body
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  async post(url: string, data: any) {
    const response = await fetch(this.computeUrl(url), {
      method: 'POST',
      body: JSON.stringify(data),
      headers: this.headers,
    });
  }
}
