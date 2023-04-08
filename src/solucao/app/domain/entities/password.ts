import { AppError } from '@/solucao/core/error/app-error';

export class Password {
  private readonly content: string;

  get value(): string {
    return this.content;
  }

  private validatePassword(password: string): {
    isValid: boolean;
    message: string;
  } {
    const defaultResponse = { isValid: false, message: '' };

    if (password.length < 8) {
      defaultResponse.message = 'Senha muito curta';

      return defaultResponse;
    }

    const notAllowedCharacters = ['*', '=', '/', '.'];

    if (notAllowedCharacters.includes(password)) {
      defaultResponse.message = `Sua senha não deve possuir ${notAllowedCharacters.join(
        ', ',
      )}`;

      return defaultResponse;
    }

    const necessaryPatterns = [
      {
        rule: 'Sua senha deve conter numeros',
        pattern: /[0-9]/,
      },
      {
        rule: 'Sua senha deve conter letras minúsculas',
        pattern: /[a-z]/,
      },
      {
        rule: 'Sua senha deve conter letras maiúsculas',
        pattern: /[A-Z]/,
      },
    ];

    for (const { rule, pattern } of necessaryPatterns) {
      if (!password.match(pattern)) {
        defaultResponse.message = rule;

        return defaultResponse;
      }
    }

    return { isValid: true, message: '' };
  }

  constructor(password: string) {
    const { isValid, message } = this.validatePassword(password);

    if (!isValid) {
      throw new AppError(message);
    }

    this.content = password;
  }
}
