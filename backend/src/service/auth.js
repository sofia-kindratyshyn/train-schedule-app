import createHttpError from 'http-errors';
import { pool } from '../config/db.js';
import bcrypt from 'bcrypt';

export const register = async (payload) => {
  const userExists = await pool.query(
    `SELECT * FROM users WHERE email='${payload.email}'`,
  );

  if (userExists.rows.length) {
    throw createHttpError(403, 'User already exists');
  }

  const hashedPassword = bcrypt.hashSync(payload.password, 10);
  await pool.query(
    `INSERT INTO users (username, password_hash, email) VALUES ('${payload.username}', '${hashedPassword}', '${payload.email}')`,
  );
  return { username: payload.username, email: payload.email };
};

export const login = async (payload) => {
  const userExists = await pool.query(
    `SELECT * FROM users WHERE email='${payload.email}'`,
  );

  if (userExists.rows.length == 0) {
    throw createHttpError(403, 'User not found');
  }

  const isPasswordCorrect = await bcrypt.compare(
    payload.password,
    userExists.rows[0].password_hash,
  );

  if (!isPasswordCorrect) {
    throw createHttpError(403, 'Invalid password');
  }
};
