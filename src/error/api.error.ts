export class APIError extends Error {
  constructor(message: string) {
    super();
    this.name = 'APIError';
    this.message = message;
  }
}
