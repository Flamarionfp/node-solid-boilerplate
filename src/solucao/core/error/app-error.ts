export class AppError {
  public readonly message: string;

  public readonly status: number;

  constructor(message: string, statusCode = 400) {
    this.message = message;
    this.status = statusCode;
  }
}
