module.exports = {
  ...require('./cors.middleware'),
  ...require('./error-handler.middleware')
};
