import { InMemoryUsersRepository } from '../../../tests/repositories/in-memory-users-repository';
import { User } from '@/domain/entities/user';

describe('Create user use case', () => {
  it('should be able to create a new user', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const user = User.create({
      name: 'flamarion',
      email: 'flamarion@example.com',
    });

    usersRepository.items.push(user);
  });
});
