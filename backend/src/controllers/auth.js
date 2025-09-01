import {
  getCurrentUser,
  login,
  refreshTokens,
  register,
  updateUser,
} from '../service/auth.js';

export const registerController = async (req, res) => {
  const registeredUser = await register(req.body);

  res.json({
    status: 201,
    message: 'User registered successfully',
    data: registeredUser,
  });
};

export const loginController = async (req, res) => {
  const session = await login(req.body);

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.cookie('accessToken', session.accessToken, {
    httpOnly: true,
    maxAge: 15 * 60 * 1000,
  });

  res.json({
    status: 201,
    message: 'User logined successfully',
    data: {
      username: session.username,
      email: session.email,
    },
  });
};

export const getCurrUserController = async (req, res) => {
  const user = await getCurrentUser(req.cookies['refreshToken']);
  res.json({
    status: 200,
    message: 'Current user fetched successfully',
    data: user,
  });
};

export const refreshTokensController = async (req, res) => {
  await refreshTokens(req.body);
  res.json({
    status: 200,
    message: 'Tokens refreshed successfully',
  });
};

export const patchCurrUserController = async (req, res) => {
  const updatedUser = await updateUser(req.body);
  res.json({
    status: 200,
    message: 'Successfully updated user',
    data: updatedUser,
  });
};
