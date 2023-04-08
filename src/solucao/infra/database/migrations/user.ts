export class UserMigration {
  migration: string;

  generateUserMigration() {
    return `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      lastName TEXT,
      email TEXT UNIQUE,
      password TEXT
    );`;
  }

  constructor() {
    this.migration = this.generateUserMigration();
  }
}

const { migration } = new UserMigration();

export { migration as userMigration };
