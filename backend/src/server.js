import express from 'express';
import cors from 'cors';
//import pino-pretty from 'pino-pretty';
//import pino from 'pino';
import trainsRouter from './routes/trains.js';
import { getEnvVar } from './utils/getEnvVar.js';
import authRouter from './routes/auth.js';
import { notFoundErr } from './middleware/notFoundError.js';
import { errorHandler } from './middleware/errorHandler.js';
import { corsOptions } from './middleware/allowCors.js';

const PORT = Number(getEnvVar('PORT'));

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors(corsOptions));
  //app.options('*', cors(corsOptions));
  //   //app.use(
  //     cors(),
  //     pino({
  //       transport: {
  //         target: 'pino-pretty',
  //       },
  //     }),
  //   );
  //app.use(pino());

  app.use(trainsRouter);
  app.use(authRouter);
  app.use(errorHandler);
  app.use(notFoundErr);

  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT} port`);
  });

  return app;
};
