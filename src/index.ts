import express, { Router } from 'express';
// import { createUserController } from './violacao';
import { createUserController } from './solucao';

class App {
  public express: express.Application;
  router: Router;

  public constructor() {
    this.express = express();
    this.router = Router();
    this.middlewares();

    this.start();
  }

  private routes(): Router {
    this.router.post('/user', createUserController.handle);

    return this.router;
  }

  private middlewares(): void {
    this.express.use(express.json());
    this.express.use(this.routes());
  }

  public start(): void {
    const port = 3333;

    this.express.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  }
}

export default new App();
