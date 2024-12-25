module.exports = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_URL,
  dialect: process.env.DB_DIALECT,
  port: Number(process.env.DB_PORT),
  logging: console.log
  // logging: (...msg) => console.log(msg) // Displays all log function call parameters
  // dialectOptions: {
  //   ssl: {
  //     require: false,
  //     rejectUnauthorized: false
  //   }
  // }
};
