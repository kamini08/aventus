import { getDBConnection } from '../utils/db';

const db = getDBConnection();

export async function setupDatabase() {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS help_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      message TEXT NOT NULL,
      timestamp TEXT NOT NULL
    );
  `);
}

export async function insertHelpMessage(name: string, message: string) {
  const timestamp = new Date().toISOString();
  await db.runAsync(
    `INSERT INTO help_messages (name, message, timestamp) VALUES (?, ?, ?);`,
    [name, message, timestamp]
  );
}

export async function getAllMessages() {
  const result = await db.getAllAsync(`SELECT * FROM help_messages;`);
  return result;
}

