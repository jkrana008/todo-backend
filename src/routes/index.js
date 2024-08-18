const express = require('express');
const router = express.Router();

const authRoute = require('./auth.route');
const userRoutes = require('./user.route');
const taskRoutes = require('./task.route');

router.use('/auth', authRoute);
router.use('/user', userRoutes);
router.use('/task', taskRoutes);

module.exports = router;
