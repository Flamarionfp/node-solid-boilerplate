import { AppError } from '@/solucao/core/error/app-error';

export class Email {
  private readonly content: string;

  get value(): string {
    return this.content;
  }

  private validateEmail(email: string): boolean {
    return email.length >= 10 && email.includes('@');
  }

  constructor(email: string) {
    const isValidEmail = this.validateEmail(email);

    if (!isValidEmail) {
      throw new AppError('E-mail inválido.');
    }

    this.content = email;
  }
}
