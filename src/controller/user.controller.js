const User = require('../models/user.model');
const bcrypt = require('bcrypt');

const { successResponse, errorResponse } = require('../utils/responseFormatter');
const logger = require('../utils/logger');

const getProfile = async (req, res) => {
  logger.info('Request received for getProfile');
  const { user } = req;
  logger.info('Get profile request received for user: ', user.email);
  const userDetails = await User.findById(user.id);
  if (!userDetails) {
    logger.info('User not found', user.email);
    return res.status(404).json(errorResponse('User not found'));
  }
  const userObj = userDetails.toObject();
  logger.info('Removing password from user object');
  delete userObj.password; // We will handle this in User schema later

  logger.info('Sending success response');
  return res.status(200).json(successResponse(userObj, 'User details retrieved successfully'));
};

const updateProfile = async (req, res) => {
  logger.info('Request received for updateProfile');
  const { user } = req;
  const { name } = req.body;
  logger.info('Update profile request received for user: ', user.email);
  const userDetails = await User.findById(user.id);
  if (!userDetails) {
    logger.info('User not found', user.email);
    return res.status(404).json(errorResponse('User not found'));
  }
  userDetails.name = name;
  await userDetails.save();
  const userObj = userDetails.toObject();
  logger.info('Removing password from user object');
  delete userObj.password; // We will handle this in User schema later

  logger.info('Sending success response');
  return res.status(200).json(successResponse(userObj, 'User details updated successfully'));
};

const changePassword = async (req, res) => {
  logger.info('Request received for changePassword');
  const { user } = req;
  const { oldPassword, newPassword } = req.body;
  logger.info('Change password request received for user: ', user.email);
  const userDetails = await User.findById(user.id);
  if (!userDetails) {
    logger.info('User not found', user.email);
    return res.status(404).json(errorResponse('User not found'));
  }

  const isPasswordCorrect = await bcrypt.compare(oldPassword, userDetails.password);
  if (!isPasswordCorrect) {
    logger.info('Password is incorrect', user.email);
    return res.status(400).json(errorResponse('Invalid Old Password!'));
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  userDetails.password = hashedPassword;
  await userDetails.save();

  logger.info('Sending success response');
  return res.status(200).json(successResponse({}, 'Password changed successfully'));
};

module.exports = {
  getProfile,
  updateProfile,
  changePassword,
};
