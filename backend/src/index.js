import { postgresConnection } from './config/db.js';
import { setupServer } from './server.js';

await postgresConnection();
setupServer();
