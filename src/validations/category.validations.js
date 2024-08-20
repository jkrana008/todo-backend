const { body } = require('express-validator');

const createCategoryValidations = [body('name').notEmpty().withMessage('Name is required')];
const updateCategoryValidations = [body('name').notEmpty().withMessage('Name is required')];

module.exports = {
  createCategoryValidations,
  updateCategoryValidations,
};
