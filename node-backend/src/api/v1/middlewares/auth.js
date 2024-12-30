const { isDefinedAndNotNull, ResponseError } = require('../../../utils');
const { Session, User } = require('../../../sequelize/models');
const { isEmpty, isEmail, isLength } = require('validator');

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
      next(new ResponseError('Authorization token has expired.', 401));
    }

    req.session = session;
    next();
  } catch (error) {
    next(new ResponseError(error.message, error.status));
  }
};

module.exports.isValidSignUpRequest = async (req, res, next) => {
  try {
    if (isDefinedAndNotNull(req.body.name)) {
      if (isEmpty(req.body.name)) {
        next(
          new ResponseError('Validation Error', 422, {
            name: 'Name cannot be empty.'
          })
        );
      }
    } else {
      next(
        new ResponseError('Validation Error', 422, {
          name: 'Name is required.'
        })
      );
    }

    if (isDefinedAndNotNull(req.body.email)) {
      if (isEmpty(req.body.email)) {
        next(
          new ResponseError('Validation Error', 422, {
            email: 'Email cannot be empty.'
          })
        );
      }

      if (!isEmail(req.body.email)) {
        next(
          new ResponseError('Validation Error', 422, {
            email: 'Email is not valid.'
          })
        );
      }

      const user = await User.findOne({
        where: { email: req.body.email },
        attributes: ['id']
      });

      if (isDefinedAndNotNull(user)) {
        next(
          new ResponseError('Validation Error', 422, {
            email: 'Email already exists.'
          })
        );
      }
    } else {
      next(
        new ResponseError('Validation Error', 422, {
          email: 'Email is required.'
        })
      );
    }

    if (isDefinedAndNotNull(req.body.password)) {
      if (isEmpty(req.body.password)) {
        next(
          new ResponseError('Validation Error', 422, {
            password: 'Password cannot be empty.'
          })
        );
      }

      if (!isLength(req.body.password, { min: 8 })) {
        next(
          new ResponseError('Validation Error', 422, {
            password: 'Password should be atleast 6 characters long.'
          })
        );
      }
    } else {
      next(
        new ResponseError('Validation Error', 422, {
          password: 'Password is required.'
        })
      );
    }

    next();
  } catch (error) {
    next(new ResponseError(error.message, 500, error.stack));
  }
};

module.exports.isValidSignInRequest = async (req, res, next) => {
  try {
    if (isDefinedAndNotNull(req.body.email)) {
      if (isEmpty(req.body.email)) {
        next(
          new ResponseError('Validation Error', 422, {
            email: 'Email cannot be empty.'
          })
        );
      }

      if (!isEmail(req.body.email)) {
        next(
          new ResponseError('Validation Error', 422, {
            email: 'Email is not valid.'
          })
        );
      }
    } else {
      next(
        new ResponseError('Validation Error', 422, {
          email: 'Email is required.'
        })
      );
    }

    if (isDefinedAndNotNull(req.body.password)) {
      if (isEmpty(req.body.password)) {
        next(
          new ResponseError('Validation Error', 422, {
            password: 'Password cannot be empty.'
          })
        );
      }
    } else {
      next(
        new ResponseError('Validation Error', 422, {
          password: 'Password is required.'
        })
      );
    }

    next();
  } catch (error) {
    next(new ResponseError(error.message, 500, error.stack));
  }
};
