export class RateLimitError extends Error {
  constructor(message: string) {
    super();
    this.name = 'RateLimitError';
    this.message = message;
  }
}
