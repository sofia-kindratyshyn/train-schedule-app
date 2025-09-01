import pkg from 'pg';
import { getEnvVar } from '../utils/getEnvVar.js';

const { Pool } = pkg;

const connectionConfig = process.env.DATABASE_URL
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    }
  : {
      host: getEnvVar('DB_HOST'),
      port: getEnvVar('DB_PORT'),
      user: getEnvVar('DB_USER'),
      password: getEnvVar('DB_PASSWORD'),
      database: getEnvVar('DB_NAME'),
    };

export const pool = new Pool(connectionConfig);

export const postgresConnection = async () => {
  try {
    const client = await pool.connect();
    console.log('✅ Connected to PostgreSQL successfully');
    client.release();
  } catch (err) {
    console.error('❌ Database connection error:', err);
  }
};
