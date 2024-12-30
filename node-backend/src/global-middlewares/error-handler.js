const { ResponseError } = require('../utils');

module.exports.badRequestMiddleware = (req, res, next) => {
  next(new ResponseError('Bad Request', 404));
};

module.exports.anyErrorMiddleware = (err, req, res, next) => {
  if (!err.status) {
    console.log('Any Error Middleware:\n', err);
  }
  const status = err.status || 500;

  res.status(status).json({
    status: false,
    message: err.message,
    error: err.error ? err.error : status === 500 ? err.stack : null
  });
};
