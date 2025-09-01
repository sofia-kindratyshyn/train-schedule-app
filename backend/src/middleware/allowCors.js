// export const corsOptions = {
//   origin: [
//     'https://train-schedule-app-theta.vercel.app',
//     'http://localhost:3000',
//     'http://localhost:3001',
//   ],
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization', 'Cookie', 'Set-Cookie'],
//   exposedHeaders: ['Set-Cookie'],
// }

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://train-schedule-app-theta.vercel.app',
];

export const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};
