import { CreateUserUseCase } from '@/solucao/app/usecases/create-user';
import { Request, Response } from 'express';

export class CreateUserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  handle = async (req: Request, res: Response): Promise<Response> => {
    try {
      await this.createUserUseCase.execute(req.body);

      return res.status(201).send('Usuário criado com sucesso');
    } catch (error: any) {
      return res.status(error.status).send(error.message);
    }
  };
}
