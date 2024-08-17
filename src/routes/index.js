const express = require("express");
const router = express.Router();

const authRoute = require("./auth.route");
const userRoutes = require("./user.route");

router.use("/auth", authRoute);
router.use("/user", userRoutes);

module.exports = router;
