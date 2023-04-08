import sqlite3 from 'sqlite3';

interface CreateUserProps {
  fullName: string;
  email: string;
  password: string;
}

export class User {
  create = async (props: CreateUserProps): Promise<void> => {
    const { fullName, email, password } = props;

    if (password.length < 8) {
      throw new Error('Senha muito curta');
    }

    const notAllowedCharacters = ['*', '=', '/', '.'];

    if (notAllowedCharacters.includes(password)) {
      throw new Error(
        `Sua senha não deve possuir ${notAllowedCharacters.join(', ')}`,
      );
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
        throw new Error(rule);
      }
    }

    if (!email.includes('@') || email.length < 10) {
      throw new Error('Email inválido');
    }

    const [name, ...rest] = fullName.split(' ');

    if (!rest.length) {
      throw new Error('É necessário o nome completo');
    }

    const lastName = rest.join(' ');

    const database = new sqlite3.Database('./database.db', (err) => {
      if (err) {
        console.error(`Falha ao conectar no banco de dados ${err.message}`);
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

      database.get(
        `SELECT * FROM users WHERE email = ?`,
        [email],
        (err, row) => {
          if (err) {
            throw err;
          }

          if (row) {
            throw new Error('Usuário já cadastrado');
          }
        },
      );

      database.run(
        `INSERT INTO users (name, lastName, email, password) VALUES (?,?,?,?)`,
        [name, lastName, email, password],
      );
    });

    database.close();
  };
}
