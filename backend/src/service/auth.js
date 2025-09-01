import createHttpError from 'http-errors';
import { pool } from '../config/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const createSession = async (user) => {
  const refreshToken = jwt.sign(
    { username: user.username, email: user.email },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' },
  );

  const accessToken = jwt.sign(
    { username: user.username, email: user.email },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' },
  );

  return { refreshToken, accessToken };
};

export const register = async (payload) => {
  const userExistsQuery = await pool.query(
    'SELECT * FROM users WHERE email = $1',
    [payload.email],
  );
  if (userExistsQuery.rows.length > 0) {
    throw createHttpError(403, 'User already exists. Try to login');
  }

  const hashedPassword = bcrypt.hashSync(payload.password, 10);

  await pool.query(
    'INSERT INTO users (username, password_hash, email) VALUES ($1, $2, $3)',
    [payload.username, hashedPassword, payload.email],
  );

  const user = { username: payload.username, email: payload.email };

  const tokens = await createSession(user);

  await pool.query(
    'INSERT INTO sessions (user_email, refresh_token, access_token) VALUES ($1, $2, $3)',
    [payload.email, tokens.refreshToken, tokens.accessToken],
  );

  return {
    username: payload.username,
    email: payload.email,
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
  };
};

export const login = async (payload) => {
  const userExistsQuery = await pool.query(
    'SELECT * FROM users WHERE email = $1',
    [payload.email],
  );

  if (userExistsQuery.rows.length === 0) {
    throw createHttpError(403, 'User not found');
  }

  const user = userExistsQuery.rows[0];

  const isPasswordCorrect = await bcrypt.compare(
    payload.password,
    user.password_hash,
  );

  if (!isPasswordCorrect) {
    throw createHttpError(403, 'Invalid password');
  }

  await pool.query('DELETE FROM sessions WHERE user_email = $1', [user.email]);

  const tokens = await createSession({
    username: user.username,
    email: user.email,
  });

  await pool.query(
    'INSERT INTO sessions (user_email, refresh_token, access_token) VALUES ($1, $2, $3)',
    [user.email, tokens.refreshToken, tokens.accessToken],
  );

  return {
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
    username: user.username,
    email: payload.email,
  };
};

export const refreshTokens = async (payload) => {
  const { refreshToken } = payload;
  if (!refreshToken) {
    throw createHttpError(401, 'Refresh token required');
  }

  const session = await pool.query(
    'SELECT * FROM sessions WHERE refresh_token = $1',
    [refreshToken],
  );

  if (session.rows.length === 0) {
    throw createHttpError(403, 'Invalid refresh token');
  }

  let userData;
  try {
    userData = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  } catch {
    throw createHttpError(403, 'Invalid refresh token');
  }

  const tokens = await createSession({
    username: userData.username,
    email: userData.email,
  });

  await pool.query(
    'UPDATE sessions SET refresh_token = $1 WHERE user_email = $2',
    [tokens.refreshToken, userData.email],
  );

  return {
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
  };
};

export const getCurrentUser = async (token) => {
  const session = await pool.query(
    'SELECT * FROM sessions WHERE refresh_token = $1',
    [token],
  );
  if (session.rows.length === 0) {
    throw createHttpError(403, 'Invalid session');
  }

  const user = await pool.query('SELECT * FROM users WHERE email = $1', [
    session.rows[0].user_email,
  ]);

  const newUser = user.rows[0];

  return {
    email: newUser.email,
    username: newUser.username,
  };
};

export const updateUser = async (payload) => {
  const { email, username } = payload;

  if (!email) {
    throw new Error('User identifier (email) is required to update.');
  }

  const updateQuery = `
    UPDATE users
    SET username = $1
    WHERE email = $2
    RETURNING *;
  `;

  const updatedUser = await pool.query(updateQuery, [username, email]);

  if (updatedUser.rows.length === 0) {
    throw new Error('User not found or update failed.');
  }

  const updatedUserResult = updatedUser.rows[0];

  return {
    email: updatedUserResult.email,
    username: updatedUserResult.username,
  };
};

export const getCurrentSession = async (token) => {
  const session = await pool.query(
    'SELECT * FROM sessions WHERE refresh_token = $1',
    [token],
  );
  if (session.rows.length === 0) {
    throw createHttpError(403, 'Invalid session');
  }

  return { refreshToken: session.rows[0].refresh_Token };
};
