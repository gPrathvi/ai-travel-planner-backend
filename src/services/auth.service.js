const User = require('../models/user.model');
const { hashPassword, comparePassword } = require('../utils/password.utils');
const { generateAccessToken, generateRefreshToken } = require('../utils/jwt.utils');

const register = async ({ email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw { status: 400, message: 'Email already exists' };
  }

  const passwordHash = await hashPassword(password);
  const user = await User.create({ email, passwordHash });

  const accessToken = generateAccessToken(user._id.toString());
  const refreshToken = generateRefreshToken(user._id.toString());

  return {
    accessToken,
    refreshToken,
    user: { id: user._id, email: user.email }
  };
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw { status: 401, message: 'Invalid email or password' };
  }

  const isValid = await comparePassword(password, user.passwordHash);
  if (!isValid) {
    throw { status: 401, message: 'Invalid email or password' };
  }

  const accessToken = generateAccessToken(user._id.toString());
  const refreshToken = generateRefreshToken(user._id.toString());

  return {
    accessToken,
    refreshToken,
    user: { id: user._id, email: user.email }
  };
};

module.exports = { register, login };