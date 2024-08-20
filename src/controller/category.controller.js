const Category = require('../models/category.model');
const { successResponse, errorResponse } = require('../utils/responseFormatter');
const logger = require('../utils/logger');

const createCategory = async (req, res) => {
  logger.info('Request received for create category');
  const { name } = req.body;
  const { user } = req;
  logger.info('Create category request received for category: ', { name });

  logger.info('Creating category instance');
  const category = new Category({
    name,
    userId: user.id,
  });

  logger.info('Saving category to database');
  await category.save();

  logger.info('Sending success response');
  return res.status(201).json(successResponse(category, 'Category created successfully'));
};

const getCategories = async (req, res) => {
  logger.info('Request received for get categories');
  const { user } = req;
  logger.info('Get categories request received');

  logger.info('Fetching categories from database');
  const categories = await Category.find({ userId: user.id });

  logger.info('Sending success response');
  return res.status(200).json(successResponse(categories, 'Categories fetched successfully'));
};

const getCategory = async (req, res) => {
  logger.info('Request received for get category');
  const { user } = req;
  const { categoryId } = req.params;
  logger.info('Get category request received for category: ', { categoryId });

  logger.info('Fetching category from database');
  const category = await Category.findOne({ userId: user.id, _id: categoryId });

  if (!category) {
    logger.error('Category not found');
    return res.status(404).json(errorResponse('Category not found'));
  }

  logger.info('Sending success response');
  return res.status(200).json(successResponse(category, 'Category fetched successfully'));
};

const updateCategory = async (req, res) => {
  logger.info('Request received for update category');
  const { user } = req;
  const { categoryId } = req.params;
  const { name } = req.body;
  logger.info('Update category request received for category: ', { categoryId });

  logger.info('Fetching category from database');
  const category = await Category.findOne({ userId: user.id, _id: categoryId });

  if (!category) {
    logger.error('Category not found');
    return res.status(404).json(errorResponse('Category not found'));
  }

  logger.info('Updating category');
  category.name = name;
  await category.save();

  logger.info('Sending success response');
  return res.status(200).json(successResponse(category, 'Category updated successfully'));
};

const deleteCategory = async (req, res) => {
  logger.info('Request received for delete category');
  const { user } = req;
  const { categoryId } = req.params;
  logger.info('Delete category request received for category: ', { categoryId });

  logger.info('Fetching category from database');
  const category = await Category.findOne({ userId: user.id, _id: categoryId });

  if (!category) {
    logger.error('Category not found');
    return res.status(404).json(errorResponse('Category not found'));
  }

  logger.info('Deleting category');
  category.isDeleted = true;
  await category.save();

  logger.info('Sending success response');
  return res.status(200).json(successResponse(category, 'Category deleted successfully'));
};

module.exports = {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
