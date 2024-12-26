// https://sequelize.org/v3/docs/models-definition/

const { sequelize, DataTypes } = require('../config');

const GoogleSheetsPipeline = sequelize.define(
  'google_sheets_pipeline',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    itemId: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    lastProcessedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      validate: {
        isDate: true,
        notEmpty: true
      }
    }
  },
  {
    timestamps: true, // it's true by default
    underscored: true
  }
);

module.exports = GoogleSheetsPipeline;
