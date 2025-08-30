import { login, register } from '../service/auth.js';

export const registerController = async (req, res) => {
  const registeredUser = await register(req.body);

  res.json({
    status: 201,
    message: 'User registered successfully',
    data: registeredUser,
  });
};

export const loginController = async (req, res) => {
  await login(req.body);

  res.json({
    status: 201,
    message: 'User logined successfully',
  });
};
