const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { successResponse, errorResponse } = require('../utils/responseFormatter');
const logger = require('../utils/logger');
const { secret, expiresIn } = require('../config/jwtConfig');

const signUp = async (req, res) => {
  logger.info('Request received for signup');
  const { name, email, password } = req.body;
  logger.info('Signup request received for user: ', { name, email });

  logger.info('Checking if user already exists', email);
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    logger.info('User already exists', email);
    return res.status(400).json(errorResponse('User already exists'));
  }

  logger.info('User already not exist,  Generating hashed password');
  const hashedPassword = await bcrypt.hash(password, 10);

  logger.info('Creating user instance');
  const user = new User({
    name,
    email,
    password: hashedPassword,
  });

  logger.info('Saving user to database');
  await user.save();

  logger.info('User created successfully and retrieving user details');
  const userObj = user.toObject();
  logger.info('Removing password from user object');
  delete userObj.password;

  logger.info('Sending success response');
  return res.status(201).json(successResponse(userObj, 'User created successfully'));
};

const login = async (req, res) => {
  logger.info('Request received for login');
  const { email, password } = req.body;
  logger.info('Login request received for user: ', { email });

  logger.info('Checking if user already exists', email);
  const user = await User.findOne({ email });
  if (!user) {
    logger.info('User does not exist', email);
    return res.status(400).json(errorResponse('Invalid credentials!'));
  }

  logger.info('Checking if password is correct');
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  console.log('isPasswordCorrect:', isPasswordCorrect);
  if (!isPasswordCorrect) {
    logger.info('Password is incorrect', email);
    return res.status(400).json(errorResponse('Invalid credentials!'));
  }

  logger.info('Password is correct, Generating JWT token');
  const token = jwt.sign({ id: user._id, email: user.email, name: user.name }, secret, { expiresIn });

  logger.info('Sending success response');
  return res.status(200).json(successResponse({ token }, 'Login successful'));
};

module.exports = {
  signUp,
  login,
};
