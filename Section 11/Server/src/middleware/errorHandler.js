function notFoundHandler(req, res, next) {
  res.status(404).json({ message: 'Route not found' });
}

// eslint-disable-next-line no-unused-vars
function globalErrorHandler(err, req, res, next) {
  console.error('[error]', err);
  const status = err.status || 500;
  res.status(status).json({ message: err.message || 'Internal Server Error' });
}

module.exports = { notFoundHandler, globalErrorHandler };

