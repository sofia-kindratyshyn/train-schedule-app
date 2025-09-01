import createHttpError from 'http-errors';
import { pool } from '../config/db';

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    next(createHttpError(401, 'Authorization header missing'));
    return;
  }

  const bearer = authHeader.split(' ')[0];
  const token = authHeader.split(' ')[1];

  if (!token || bearer !== 'Bearer') {
    next(createHttpError(401, 'Invalid authorization header format'));
    return;
  }

  const session = pool.query(`SELECT * FROM sessions WHERE access_token = $1`, [
    token,
  ]);

  if (!session) {
    next(createHttpError(401, 'Invalid token'));
    return;
  }

  const isExipred = new Date() - new Date(session.created_at) > 15 * 60 * 1000;

  if (isExipred) {
    next(createHttpError(401, 'Token expired'));
    return;
  }
  req.user = session.user_email;
  next();
};
