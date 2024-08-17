const { body } = require('express-validator');

const changePasswordValidations = [
  body('oldPassword').notEmpty().withMessage('Old password is required'),
  body('newPassword').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
];

const updateProfileValidations = [body('name').notEmpty().withMessage('Name is required')];

module.exports = {
  changePasswordValidations,
  updateProfileValidations,
};
