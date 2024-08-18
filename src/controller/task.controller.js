const Task = require('../models/task.model');
const { successResponse, errorResponse } = require('../utils/responseFormatter');
const logger = require('../utils/logger');

const createTask = async (req, res) => {
  logger.info('Request received for createTask');
  const { user } = req;
  const { name } = req.body;
  logger.info('Create task request received for user: ', user.email);
  const task = new Task({
    name,
    userId: user.id,
  });
  await task.save();
  logger.info('Sending success response');
  return res.status(201).json(successResponse(task, 'Task created successfully'));
};

const getTasks = async (req, res) => {
  logger.info('Request received for getTasks');
  const { user } = req;
  logger.info('Get tasks request received for user: ', user.email);
  const tasks = await Task.find({ userId: user.id });
  logger.info('Sending success response');
  return res.status(200).json(successResponse(tasks, 'Tasks retrieved successfully'));
};

const getTask = async (req, res) => {
  logger.info('Request received for getTask');
  const { user } = req;
  const { id } = req.params;
  logger.info('Get task request received for user: ', user.email);
  const task = await Task.findOne({ _id: id, userId: user.id });
  if (!task) {
    logger.error('Task not found');
    return res.status(404).json(errorResponse(null, 'Task not found'));
  }
  logger.info('Sending success response');
  return res.status(200).json(successResponse(task, 'Task retrieved successfully'));
};

const updateTask = async (req, res) => {
  logger.info('Request received for updateTask');
  const { user } = req;
  const { id } = req.params;
  const { name } = req.body;
  logger.info('Update task request received for user: ', user.email);
  const task = await Task.findOne({ _id: id, userId: user.id });
  if (!task) {
    logger.error('Task not found');
    return res.status(404).json(errorResponse(null, 'Task not found'));
  }
  task.name = name;
  await task.save();
  logger.info('Sending success response');
  return res.status(200).json(successResponse(task, 'Task updated successfully'));
};

const markCompleted = async (req, res) => {
  logger.info('Request received for markCompleted');
  const { user } = req;
  const { id } = req.params;
  logger.info('Mark completed request received for user: ', user.email);
  const task = await Task.findOne({ _id: id, userId: user.id });
  if (!task) {
    logger.error('Task not found');
    return res.status(404).json(errorResponse(null, 'Task not found'));
  }
  task.completed = true;
  await task.save();
  logger.info('Sending success response');
  return res.status(200).json(successResponse(task, 'Task marked completed successfully'));
};

const deleteTask = async (req, res) => {
  logger.info('Request received for deleteTask');
  const { user } = req;
  const { id } = req.params;
  logger.info('Delete task request received for user: ', user.email);
  const task = await Task.findOne({ _id: id, userId: user.id });
  if (!task) {
    logger.error('Task not found');
    return res.status(404).json(errorResponse(null, 'Task not found'));
  }
  task.isDeleted = true;
  await task.save();
  logger.info('Sending success response');
  return res.status(200).json(successResponse(task, 'Task deleted successfully'));
};

module.exports = {
  createTask,
  getTasks,
  getTask,
  updateTask,
  markCompleted,
  deleteTask,
};
