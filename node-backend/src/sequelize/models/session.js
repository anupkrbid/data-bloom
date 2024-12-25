// https://sequelize.org/v3/docs/models-definition/

const { sequelize, DataTypes } = require('../config');

const Session = sequelize.define(
  'session',
  {
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(
        Date.now() + Number(process.env.SESSION_EXPIRY) * 1000
      ),
      validate: {
        nonEmpty: true
      }
    }
  },
  {
    timestamps: true, // it's true by default
    underscored: true
  }
);

module.exports = Session;
