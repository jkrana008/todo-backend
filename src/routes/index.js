const express = require('express');
const router = express.Router();

const authRoute = require('./auth.route');
const userRoutes = require('./user.route');
const taskRoutes = require('./task.route');
const categoryRoutes = require('./category.route');

router.use('/auth', authRoute);
router.use('/user', userRoutes);
router.use('/task', taskRoutes);
router.use('/category', categoryRoutes);

module.exports = router;
