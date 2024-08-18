const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  createTask,
  getTasks,
  getTask,
  updateTask,
  markCompleted,
  deleteTask,
} = require('../controller/task.controller');

router.post('/', auth, createTask);
router.get('/', auth, getTasks);
router.get('/:id', auth, getTask);
router.put('/:id', auth, updateTask);
router.patch('/:id/complete', auth, markCompleted);
router.delete('/:id', auth, deleteTask);

module.exports = router;
