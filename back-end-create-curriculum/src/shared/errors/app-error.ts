export class AppError extends Error {
  constructor(
    public readonly message: string,
    public readonly statusCode: number = 400,
    public readonly isCustomError: boolean = true,
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
