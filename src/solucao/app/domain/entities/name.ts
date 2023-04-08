import { AppError } from '@/solucao/core/error/app-error';

export class Name {
  public readonly firstName: string;
  public readonly lastName: string;

  private validateName(name: string): boolean {
    return name.length >= 3;
  }

  constructor(fullName: string) {
    const [name, ...rest] = fullName.trim().split(' ');

    if (!this.validateName(name)) {
      throw new AppError('Nome inválido');
    }

    if (!rest.length) {
      throw new AppError('É necessário o nome completo');
    }

    this.firstName = name;
    this.lastName = rest.join(' ');
  }
}
