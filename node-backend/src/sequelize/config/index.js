const { Sequelize, DataTypes } = require('sequelize');

const config = require('./config');

module.exports.sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

module.exports.DataTypes = DataTypes;
