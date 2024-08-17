/**
 * Formats a success response.
 * @param {object} data - The data to be included in the response.
 * @param {string} message - A message describing the result.
 * @returns {object} - The formatted success response.
 */
function successResponse(data = null, message = "Operation successful.") {
  return {
    success: true,
    data,
    message,
  };
}

/**
 * Formats an error response.
 * @param {string} message - A message describing the error.
 * @param {string} [error] - Detailed error information (optional).
 * @returns {object} - The formatted error response.
 */
function errorResponse(message = "Operation failed.", error = null) {
  return {
    success: false,
    data: null,
    message,
    error,
  };
}

module.exports = {
  successResponse,
  errorResponse,
};
