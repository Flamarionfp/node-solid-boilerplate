import sqlite3 from 'sqlite3';
import { Request, Response } from 'express';

class CreateUserController {
  handle = async (req: Request, res: Response): Promise<Response | void> => {
    const { fullName, email, password } = req.body;

    if (password.length < 8) {
      return res.status(400).send('Senha muito curta');
    }

    const notAllowedCharacters = ['*', '=', '/', '.'];

    if (notAllowedCharacters.includes(password)) {
      return res
        .status(400)
        .send(`Sua senha não deve possuir ${notAllowedCharacters.join(', ')}`);
    }

    const necessaryPatterns = [
      {
        rule: 'Sua senha deve conter numeros',
        pattern: /[0-9]/,
      },
      {
        rule: 'Sua senha deve conter letras minúsculas',
        pattern: /[a-z]/,
      },
      {
        rule: 'Sua senha deve conter letras maiúsculas',
        pattern: /[A-Z]/,
      },
    ];

    for (const { rule, pattern } of necessaryPatterns) {
      if (!password.match(pattern)) {
        return res.status(400).send(rule);
      }
    }

    if (!email.includes('@') || email.length < 10) {
      return res.status(400).send('Email inválido');
    }

    const [name, ...rest] = fullName.trim().split(' ');

    if (name.length < 3) {
      return res.status(400).send('Nome inválido');
    }

    if (!rest.length) {
      return res.status(400).send('É necessário o nome completo');
    }

    const lastName = rest.join(' ');

    const database = new sqlite3.Database('./database.db', (err) => {
      if (err) {
        return res
          .status(500)
          .send(`Falha ao conectar no banco de dados ${err.message}`);
      }
      console.log('Conectado ao banco de dados SQLite.');
    });

    database.serialize(() => {
      database.run(
        `CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          lastName TEXT,
          email TEXT,
          password TEXT
        );`,
      );
    });

    database.get(`SELECT * FROM users WHERE email = ?`, [email], (err, row) => {
      if (err) {
        return res
          .status(500)
          .send(`Falha ao consultar o banco de dados ${err.message}`);
      }

      if (row) {
        return res.status(400).send('Usuário já cadastrado');
      } else {
        database.run(
          `INSERT INTO users (name, lastName, email, password) VALUES (?,?,?,?)`,
          [name, lastName, email, password],
        );

        return res.status(201).send('Usuário criado com sucesso');
      }
    });
  };
}

const createUserController = new CreateUserController();

export { createUserController };
