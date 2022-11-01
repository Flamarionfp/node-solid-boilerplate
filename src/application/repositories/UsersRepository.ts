import { User } from '@/domain/entities/user';

export interface UsersRepository {
  findById(id: string): Promise<User | null>;
}
