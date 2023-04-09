import { Email } from './email';

describe('Email entity', () => {
  it('should not be able to create an email without @ or with less than 10 characters', () => {
    expect(() => new Email('invalid_email')).toThrowError('E-mail inválido.');
  });

  it('should be able to create an email instance with a valid email', () => {
    const email = new Email('validemail@email.com');

    expect(email).toHaveProperty('value');
  });
});
