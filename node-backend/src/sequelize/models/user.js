// https://sequelize.org/v3/docs/models-definition/

const { sequelize, DataTypes } = require('../config');

const User = sequelize.define(
  'user',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        nonEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        nonEmpty: true,
        isEmail: true
      }
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        nonEmpty: true
      }
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
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
