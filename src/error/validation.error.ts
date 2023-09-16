export class ValidationError extends Error {
  public message: string;

  constructor(message: string) {
    super();
    this.message = `ValidationError: ${message}`;
  }
}
