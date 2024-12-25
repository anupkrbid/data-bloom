// https://sequelize.org/v3/docs/models-definition/

const { sequelize, Sequelize } = require('../config');

const User = sequelize.define(
  'user',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        nonEmpty: true
      }
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      validate: {
        nonEmpty: true,
        isEmail: true
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        nonEmpty: true
      }
    }
  },
  {
    timestamps: true, // it's true by default
    underscored: true
    // indexes: [
    //   // Create a unique index on email
    //   {
    //     unique: true,
    //     fields: ['email']
    //   }
    // ]
  }
);

module.exports = User;
