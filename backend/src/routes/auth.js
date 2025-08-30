import { Router } from 'express';
import { loginController, registerController } from '../controllers/auth.js';

const authRouter = Router();

authRouter.post('/auth/register', registerController);
authRouter.post('/auth/login', loginController);

export default authRouter;
