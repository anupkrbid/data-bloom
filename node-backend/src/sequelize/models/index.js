// https://sequelize.org/docs/v6/core-concepts/model-instances/
// https://sequelize.org/v3/docs/associations/
// https://sequelize.org/docs/v6/core-concepts/assocs/#special-methodsmixins-added-to-instances

const User = require('./user');
const Session = require('./session');
const GoogleSheetsPipeline = require('./google-sheets-pipeline');

User.hasMany(Session);
Session.belongsTo(User, { onDelete: 'CASCADE' });

module.exports = {
  User,
  Session,
  GoogleSheetsPipeline
};
