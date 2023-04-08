import { User } from './violacao';

class Main {
  constructor() {
    const user = new User();

    try {
      user.create({
        fullName: 'John Smith',
        email: 'user@example.com',
        password: '12345678Aa',
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default new Main();
