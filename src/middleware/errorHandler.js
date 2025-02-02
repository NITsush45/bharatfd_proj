const errorHandler = (err, req, res, next) => {
    const statusCode = err.status || 500;
    if (process.env.NODE_ENV === "development") {
      console.error(err.stack);
    }
    const errorResponse = {
      success: false,
      message: err.message || "Internal Server Error",
    };

    if (process.env.NODE_ENV === "development" && err.stack) {
      errorResponse.stack = err.stack;
    }
    res.status(statusCode).json(errorResponse);
  };
  
  module.exports = errorHandler;
  