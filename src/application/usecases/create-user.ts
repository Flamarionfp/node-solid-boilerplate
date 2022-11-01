import { User } from '@/domain/entities/user';
import { UsersRepository } from '../repositories/UsersRepository';

type CreateUserSubmissionRequest = {
  id: string;
  name: string;
  email: string;
};

export class CreateUser {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ id, name, email }: CreateUserSubmissionRequest) {
    const user = await this.usersRepository.findById(id);

    if (user) {
      throw new Error('User already exists.');
    }

    const createdUser = User.create({
      name,
      email,
    });

    return createdUser;
  }
}
