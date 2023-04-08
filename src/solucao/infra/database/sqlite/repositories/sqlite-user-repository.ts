import { UserRepository } from '@/solucao/app/repositories/user';
import { sqlite } from '../index';
import { User } from '@/solucao/app/domain/entities/user';
import { AppError } from '@/solucao/core/error/app-error';

export class SQliteUserRepository implements UserRepository {
  async create(user: User): Promise<void> {
    const existingUser = await new Promise((resolve, reject) => {
      sqlite.instance.get(
        `SELECT * FROM users WHERE email = ?`,
        [user.props.email.value],
        (err, row) => {
          if (err) {
            reject(
              new AppError(
                `Falha ao consultar o banco de dados ${err.message}`,
                500,
              ),
            );
          } else {
            resolve(row);
          }
        },
      );
    });

    if (existingUser) {
      throw new AppError('Usuário já cadastrado');
    } else {
      // Insere o novo usuário
      sqlite.instance.run(
        `INSERT INTO users (name, lastName, email, password) VALUES (?,?,?,?)`,
        [
          user.props.fullName.firstName,
          user.props.fullName.lastName,
          user.props.email.value,
          user.props.password.value,
        ],
      );
    }
  }
}
