const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf, colorize } = format;

// Define the log format
const logFormat = printf(({ level, message, timestamp, ...meta }) => {
  const metaString = Object.keys(meta).length
    ? ` | ${JSON.stringify(meta)}`
    : "";
  return `${timestamp} ${level}: ${message}${metaString}`;
});

// Create the logger
const logger = createLogger({
  format: combine(
    colorize(), // Add color to the console output
    timestamp(), // Add timestamp to the logs
    logFormat
  ),
  transports: [
    new transports.Console(), // Log to the console
    new transports.File({ filename: "logs/error.log", level: "error" }), // Log errors to a file
    new transports.File({ filename: "logs/combined.log" }), // Log all levels to a file
  ],
  exceptionHandlers: [
    new transports.File({ filename: "logs/exceptions.log" }), // Log unhandled exceptions
  ],
  rejectionHandlers: [
    new transports.File({ filename: "logs/rejections.log" }), // Log unhandled promise rejections
  ],
});

module.exports = logger;
