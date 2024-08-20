const { body } = require('express-validator');

const createTaskValidations = [
  body('name').notEmpty().withMessage('Name is required'),
  body('categoryId').notEmpty().withMessage('Category is required'),
];

const updateTaskValidations = [
  body('name').notEmpty().withMessage('Name is required'),
  body('categoryId').notEmpty().withMessage('Category is required'),
];

module.exports = {
  createTaskValidations,
  updateTaskValidations,
};
