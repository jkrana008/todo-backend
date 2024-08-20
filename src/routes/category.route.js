const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { createCategoryValidations, updateCategoryValidations } = require('../validations/category.validations');
const validate = require('../middleware/validationChecker');

const {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} = require('../controller/category.controller');

router.post('/', auth, createCategoryValidations, validate, createCategory);
router.get('/', auth, getCategories);
router.get('/:categoryId', auth, getCategory);
router.put('/:categoryId', auth, updateCategoryValidations, validate, updateCategory);
router.delete('/:categoryId', auth, deleteCategory);

module.exports = router;
