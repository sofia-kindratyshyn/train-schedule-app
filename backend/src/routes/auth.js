import { Router } from 'express';
import {
  getCurrUserController,
  loginController,
  patchCurrUserController,
  refreshTokensController,
  registerController,
} from '../controllers/auth.js';

const authRouter = Router();

authRouter.post('/auth/register', registerController);
authRouter.post('/auth/login', loginController);
authRouter.post('/auth/refresh', refreshTokensController);
authRouter.get('/users/me', getCurrUserController);
authRouter.patch('/users', patchCurrUserController);

export default authRouter;
