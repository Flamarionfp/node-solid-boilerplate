import { InMemoryUsersRepository } from '../../../../tests/repositories/in-memory-users-repository';
import { Email } from '../domain/entities/email';
import { Name } from '../domain/entities/name';
import { Password } from '../domain/entities/password';
import { User } from '../domain/entities/user';

describe('Create user use case', () => {
  const usersRepository = new InMemoryUsersRepository();

  const userProps = {
    fullName: new Name('John Doe'),
    email: new Email('John.Doe@example.com'),
    password: new Password('Aa123456'),
  };

  async function createUserMock() {
    const user = new User(userProps);

    await usersRepository.create(user);
  }

  beforeEach(() => {
    usersRepository.users = [];
  });

  it('should be able to create a user', async () => {
    const user = new User(userProps);

    await usersRepository.create(user);

    expect(usersRepository.users).toHaveLength(1);
  });

  it('should not be able to create a user with an existing email', async () => {
    await createUserMock();

    const user = new User(userProps);

    try {
      await usersRepository.create(user);
    } catch (err: any) {
      expect(err.message).toBe('Usuário já cadastrado');
    }

    expect(usersRepository.users).toHaveLength(1);
  });
});
