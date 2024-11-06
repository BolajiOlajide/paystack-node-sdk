export class ForbiddenError extends Error {
  constructor(message: string) {
    super();
    this.name = 'ForbiddenError';
    this.message = message;
  }
}
