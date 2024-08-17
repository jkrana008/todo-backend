const express = require("express");
const router = express.Router();
const { signupValidations } = require("../validations/user.validations");
const validationChecker = require("../middleware/validationChecker");

const { signUp } = require("../controller/user.controller");

router.post("/signup", signupValidations, validationChecker, signUp);

module.exports = router;
