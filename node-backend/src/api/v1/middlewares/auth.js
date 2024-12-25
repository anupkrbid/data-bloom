const { isDefinedAndNotNull, ResponseError } = require('../../../utils');
const { Session, User } = require('../../../sequelize/models');

module.exports.isAuthenticated = async (req, res, next) => {
  try {
    if (!isDefinedAndNotNull(req.headers.authorization)) {
      next(new ResponseError('Authorization token missing.', 401));
    }

    const token = req.headers.authorization.split(' ')[1];

    const session = await Session.findByPk(token, {
      attributes: { exclude: ['created_at', 'updated_at'] },
      include: {
        model: User,
        attributes: { exclude: ['created_at', 'updated_at'] }
      }
    });

    if (!isDefinedAndNotNull(session)) {
      next(new ResponseError('Invalid authorization token.', 401));
    }

    if (new Date(session.expiresAt) < new Date()) {
      next(new ResponseError('Authorization token expired.', 401));
    }

    req.session = session;
    next();
  } catch (error) {
    next(new ResponseError(error.message, 401));
  }
};
