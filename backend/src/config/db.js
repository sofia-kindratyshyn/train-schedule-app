//import pkg from 'pg';
//import { getEnvVar } from '../utils/getEnvVar.js';
import dotenv from 'dotenv';
dotenv.config();
//const { Pool } = pkg;

import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL;
const sql = postgres(connectionString);

export default sql;

// export const pool = new Pool({
//   host: getEnvVar('DB_HOST'),
//   port: getEnvVar('DB_PORT'),
//   user: getEnvVar('DB_USER'),
//   password: getEnvVar('DB_PASSWORD'),
//   database: getEnvVar('DB_NAME'),
// });

// export const postgresConnection = async () => {
//   pool
//     .connect()
//     .then(() => console.log('Connected to PostgreSQL'))
//     .catch((err) => console.error('Database connection error:', err));
// };
