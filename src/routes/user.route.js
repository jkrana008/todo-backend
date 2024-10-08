const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');

const { getProfile, updateProfile, changePassword } = require('../controller/user.controller');
const { changePasswordValidations, updateProfileValidations } = require('../validations/user.validations');
const validationChecker = require('../middleware/validationChecker');

router.get('/profile', auth, getProfile);
router.put('/', auth, updateProfileValidations, validationChecker, updateProfile);
router.patch('/change-password', auth, changePasswordValidations, validationChecker, changePassword);

module.exports = router;
