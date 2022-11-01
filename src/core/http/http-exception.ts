import { HttpStatus } from './http-status';

export class HttpException extends Error {
  constructor(public status: HttpStatus, message: string) {
    super(message);
    this.name = 'HttpException';
  }

  static parse(error: Error) {
    if (error instanceof HttpException) return error;
    return new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
}
