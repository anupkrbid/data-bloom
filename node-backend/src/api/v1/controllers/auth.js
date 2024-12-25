const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken'); // will be using in future to implement refresh token

const { sequelize } = require('../../../sequelize/config');
const { User, Session } = require('../../../sequelize/models');
const {
  hashPassword,
  comparePassword,
  isDefinedAndNotNull
} = require('../../../utils');
const { ResponseError } = require('../../../utils');

exports.signUp = async (req, res, next) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const { name, email, password } = req.body;

      const passwordHash = await hashPassword(password);

      const newUser = await User.create(
        { name, email, passwordHash },
        { transaction: t }
      );

      const newSession = await Session.create({}, { transaction: t });

      newSession.setUser(newUser);

      return { session: newSession, user: newUser };
    });

    res.status(201).json({
      status: true,
      message: 'Sign up successful',
      data: {
        authToken: result.session.uuid,
        user: {
          id: result.user.id,
          name: result.user.name,
          email: result.user.email
        }
      }
    });
  } catch (err) {
    next(new ResponseError(err.message));
  }
};

exports.signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
      attributes: { exclude: ['created_at', 'updated_at'] }
    });

    if (!user.isActive) {
      throw new ResponseError('Account is inactive.', 401);
    }

    const isMatched = await comparePassword(password, user.passwordHash);

    if (!isMatched) {
      throw new ResponseError('Authentication failed.', 401);
    }

    const newSession = user.createSession();

    // const newSession = await Session.create({});
    // newSession.addUser(user);

    res.status(200).json({
      status: true,
      message: 'Sign in successful',
      data: {
        authToken: newSession.uuid,
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      }
    });
  } catch (err) {
    next(new ResponseError(err.message));
  }
};

exports.signOut = async (req, res, next) => {
  // const token = req.session.uuid;
  await req.session.destroy();
  // awaitSession.destroy({ where: { uuid: token } });
  res.status(200).json({
    status: true,
    message: 'Sign out successful',
    data: null
  });
};

exports.isEmailAvailable = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { email: req.body.email },
      attributes: ['id', 'email']
    });
    if (isDefinedAndNotNull(user)) {
      res.status(200).json({
        status: true,
        message: 'Email is available'
      });
    } else {
      res.status(200).json({
        status: false,
        message: 'Email is not available'
      });
    }
  } catch (err) {
    next(new ResponseError(err.message));
  }
};

// exports.forgotPassword = (req, res, next) => {
//   res.status(200).json({
//     status: true,
//     message: 'FORGOT PASSWORD',
//     data: req.body
//   });
// };

// exports.resetPassword = (req, res, next) => {
//   res.status(200).json({
//     status: true,
//     message: 'RESET PASSWORD',
//     data: req.body
//   });
// };
