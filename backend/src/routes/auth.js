import { Router } from 'express';
import {
  getCurrSessionController,
  getCurrUserController,
  loginController,
  logoutController,
  patchCurrUserController,
  refreshTokensController,
  registerController,
} from '../controllers/auth.js';

const authRouter = Router();

authRouter.post('/auth/register', registerController);
authRouter.post('/auth/login', loginController);
authRouter.post('/auth/refresh', refreshTokensController);
authRouter.get('/auth/session', getCurrSessionController);
authRouter.post('/auth/logout', logoutController);
authRouter.get('/users/me', getCurrUserController);
authRouter.patch('/users', patchCurrUserController);

export default authRouter;
