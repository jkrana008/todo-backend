const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const {
  successResponse,
  errorResponse,
} = require("../utils/responseFormatter");
const logger = require("../utils/logger");

const signUp = async (req, res) => {
  logger.info("Request received for signup");
  const { name, email, password } = req.body;
  logger.info("Signup request received for user: ", { name, email });

  logger.info("Checking if user already exists", email);
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    logger.info("User already exists", email);
    return res.status(400).json(errorResponse("User already exists"));
  }

  logger.info("User already not exist,  Generating hashed password");
  const hashedPassword = await bcrypt.hash(password, 10);

  logger.info("Creating user instance");
  const user = new User({
    name,
    email,
    password: hashedPassword,
  });

  logger.info("Saving user to database");
  await user.save();

  logger.info("User created successfully and retrieving user details");
  const userObj = user.toObject();
  logger.info("Removing password from user object");
  delete userObj.password;

  logger.info("Sending success response");
  return res
    .status(201)
    .json(successResponse(userObj, "User created successfully"));
};

module.exports = {
  signUp,
};
