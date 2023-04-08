import sqlite3 from 'sqlite3';
import migrations from '../migrations';
import { AppError } from '@/solucao/core/error/app-error';

export class SQLiteDatabase {
  public instance: sqlite3.Database;

  constructor() {
    this.instance = this.connect();
    this.runMigrations();
  }

  connect() {
    const database = new sqlite3.Database('./database.db', (err) => {
      if (err) {
        throw new AppError(
          `Falha ao conectar no banco de dados ${err.message}`,
          500,
        );
      }
      console.log('Conectado ao banco de dados SQLite.');
    });

    return database;
  }

  runMigrations() {
    this.instance.serialize(() => {
      migrations.forEach((migration) => {
        this.instance.run(migration);
      });
    });
  }
}

const sqlite = new SQLiteDatabase();

export { sqlite };
