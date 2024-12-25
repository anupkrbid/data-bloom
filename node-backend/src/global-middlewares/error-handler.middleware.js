module.exports.badRequestMiddleware = (req, res, next) => {
  const error = new Error('Bad Request');
  error.status = 404;
  next(error);
};

module.exports.anyErrorMiddleware = (err, req, res, next) => {
  if (!err.status) {
    console.log('Any Error Middleware:\n', err);
  }
  res.status(err.status || 500).json({
    status: false,
    error: err.message,
    errorDetails: err.errorDetails ? err.errorDetails : ''
  });
};
