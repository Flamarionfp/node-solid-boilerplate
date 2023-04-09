import { UserRepository } from '../../src/solucao/app/repositories/user';
import { User } from '../../src/solucao/app/domain/entities/user';
import { AppError } from '../../src/solucao/core/error/app-error';

interface UserProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
export class InMemoryUsersRepository implements UserRepository {
  public users: UserProps[] = [];

  async create(user: User): Promise<void> {
    const existingUser = this.users.find(
      ({ email }) => email === user.props.email.value,
    );

    console.log('DEBUG users', this.users);
    console.log('DEBUG existingUser', existingUser);

    if (existingUser) {
      throw new AppError('Usuário já cadastrado');
    }

    this.users.push({
      firstName: user.props.fullName.firstName,
      lastName: user.props.fullName.lastName,
      email: user.props.email.value,
      password: user.props.password.value,
    });
  }
}
