import { User } from '../domain/entities/user';

export interface UserRepository {
  create(user: User): Promise<void>;
}
