const { ResponseError } = require('../utils');

module.exports.badRequestMiddleware = (req, res, next) => {
  next(new ResponseError('Bad Request', 404));
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
