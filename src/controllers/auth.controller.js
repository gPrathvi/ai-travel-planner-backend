const { register, login } = require('../services/auth.service');
const { verifyRefreshToken, generateAccessToken } = require('../utils/jwt.utils');

const registerController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await register({ email, password });
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await login({ email, password });
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

const refreshController = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ success: false, message: 'Refresh token required' });
    }
    const decoded = verifyRefreshToken(refreshToken);
    const accessToken = generateAccessToken(decoded.userId);
    res.json({ success: true, data: { accessToken } });
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid refresh token' });
  }
};

const logoutController = async (req, res) => {
  res.json({ success: true, message: 'Logged out successfully' });
};

module.exports = {
  registerController,
  loginController,
  refreshController,
  logoutController
};