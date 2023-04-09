import { Password } from './password';

describe('Password entity', () => {
  it('should not be able to create a password with less than 8 characters', () => {
    expect(() => new Password('1234567')).toThrowError('Senha muito curta');
  });

  const invalidChars = ['*', '=', '/', '.'];

  it.each(invalidChars)(
    'should not be able to create a password with the invalid character "%s"',
    (invalidChar) => {
      expect(() => new Password(`password${invalidChar}`)).toThrow();
    },
  );

  it('should not be able to create a password without numbers', () => {
    expect(() => new Password('password')).toThrowError(
      'Sua senha deve conter numeros',
    );
  });

  it('should not be able to create a password without lowercase letters', () => {
    expect(() => new Password('1PASSWORD')).toThrowError(
      'Sua senha deve conter letras minúsculas',
    );
  });

  it('should not be able to create a password without uppercase letters', () => {
    expect(() => new Password('1password')).toThrowError(
      'Sua senha deve conter letras maiúsculas',
    );
  });

  it('should be able to create a password instance with a valid password', () => {
    const password = new Password('1Password');

    expect(password).toHaveProperty('value');
  });
});
