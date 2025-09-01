import pkg from 'pg';
import { getEnvVar } from '../utils/getEnvVar.js';

const { Pool } = pkg;

export const pool = new Pool({
  connectionString: getEnvVar('DATABASE_URL'),
  ssl: false,
});

export const postgresConnection = async () => {
  pool
    .connect()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch((err) => console.error('Database connection error:', err));
};
