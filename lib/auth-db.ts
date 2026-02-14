import { DatabaseSync } from "node:sqlite";
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";

const dbPath = join(process.cwd(), ".data", "dealvista-auth.db");
mkdirSync(dirname(dbPath), { recursive: true });

const globalDb = globalThis as typeof globalThis & { __dealvistaAuthDb?: DatabaseSync };
const db = globalDb.__dealvistaAuthDb ?? new DatabaseSync(dbPath);
if (!globalDb.__dealvistaAuthDb) {
  globalDb.__dealvistaAuthDb = db;
  db.exec(`
    PRAGMA busy_timeout = 5000;
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      passwordHash TEXT NOT NULL,
      isVerified INTEGER DEFAULT 0,
      role TEXT CHECK(role IN ('owner','admin','support','user')) DEFAULT 'user',
      createdAt INTEGER NOT NULL,
      lastLoginAt INTEGER NULL
    );

    CREATE TABLE IF NOT EXISTS email_verification_codes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId TEXT NOT NULL,
      codeHash TEXT NOT NULL,
      expiresAt INTEGER NOT NULL,
      usedAt INTEGER NULL,
      attempts INTEGER DEFAULT 0,
      createdAt INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS password_reset_tokens (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId TEXT NOT NULL,
      tokenHash TEXT NOT NULL,
      expiresAt INTEGER NOT NULL,
      usedAt INTEGER NULL,
      createdAt INTEGER NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
    CREATE INDEX IF NOT EXISTS idx_verification_user ON email_verification_codes(userId, createdAt DESC);
    CREATE INDEX IF NOT EXISTS idx_reset_user ON password_reset_tokens(userId, createdAt DESC);
  `);
}

export { db };
