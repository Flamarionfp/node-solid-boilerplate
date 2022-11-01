import { HttpException } from './http-exception';
import { HttpStatus } from './http-status';

describe('HttpException', () => {
  it('should be assigned name, status and message', () => {
    const status = HttpStatus.NOT_FOUND;
    const message = 'Item not found.';
    const error = new HttpException(status, message);

    expect(error.name).toBe('HttpException');
    expect(error.status).toBe(status);
    expect(error.message).toBe(message);
  });

  it('should be return the same instance on parse', () => {
    const error = new HttpException(
      HttpStatus.UNAUTHORIZED,
      'Client without permission.',
    );

    expect(HttpException.parse(error)).toBe(error);
  });

  it('should be parsed to a internal server error', () => {
    const message = 'Unexpected error occurred.';
    const error = HttpException.parse(new Error(message));

    expect(error.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(error.message).toBe(message);
  });
});
