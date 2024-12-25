const bcrypt = require('bcrypt');

module.exports.hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(Number(process.env.HASHING_SALT_ROUNDS));
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

module.exports.comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};
