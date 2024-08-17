module.exports = {
  secret: process.env.JWT_SECRET, // Store in env variable for security
  expiresIn: "24h", // Token expiration time
};
