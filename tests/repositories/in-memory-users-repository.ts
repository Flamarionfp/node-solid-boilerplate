import { UsersRepository } from '../../src/application/repositories/UsersRepository';
import { User } from '../../src/domain/entities/user';

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = [];

  async findById(id: string): Promise<User | null> {
    const user = this.items.find((user) => user.id === id);

    if (!user) {
      return null;
    }

    return user;
  }
}
