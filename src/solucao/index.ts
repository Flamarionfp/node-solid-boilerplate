import { CreateUserUseCase } from './app/usecases/create-user';
import { CreateUserController } from './infra/controllers/create-user';
import { SQliteUserRepository } from './infra/database/sqlite/repositories/sqlite-user-repository';

const sqliteUserRepository = new SQliteUserRepository();
const createUserUseCase = new CreateUserUseCase(sqliteUserRepository);
const createUserController = new CreateUserController(createUserUseCase);

export { createUserController };
