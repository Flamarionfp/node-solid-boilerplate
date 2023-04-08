import { Email } from '../domain/entities/email';
import { Name } from '../domain/entities/name';
import { Password } from '../domain/entities/password';
import { User } from '../domain/entities/user';
import { CreateUserDTO } from '../dtos/user';
import { UserRepository } from '../repositories/user';

export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  execute = async (props: CreateUserDTO): Promise<void> => {
    const { fullName = '', email = '', password = '' } = props;

    const user = new User({
      fullName: new Name(fullName),
      email: new Email(email),
      password: new Password(password),
    });

    await this.userRepository.create(user);
  };
}
