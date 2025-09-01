import {
  getCurrentSession,
  getCurrentUser,
  login,
  refreshTokens,
  register,
  updateUser,
} from '../service/auth.js';

export const registerController = async (req, res) => {
  const session = await register(req.body);

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    maxAge: 15 * 60 * 1000,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });
  res.cookie('accessToken', session.accessToken, {
    httpOnly: true,
    maxAge: 15 * 60 * 1000,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });

  res.status(201).json({
    message: 'User registered successfully',
    data: session,
  });
};

export const loginController = async (req, res) => {
  const session = await login(req.body);

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });

  res.cookie('accessToken', session.accessToken, {
    httpOnly: true,
    maxAge: 15 * 60 * 1000,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
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

export const logoutController = async (req, res) => {
  res.clearCookie('refreshToken', { path: '/' });
  res.clearCookie('accessToken', { path: '/' });
  res.json({
    status: 200,
    message: 'User logged out successfully',
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

export const getCurrSessionController = async (req, res) => {
  const session = await getCurrentSession(req.cookies['refreshToken']);
  res.json({
    status: 200,
    message: 'Successfully get session',
    data: session,
  });
};
