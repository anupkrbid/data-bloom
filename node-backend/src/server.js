require('dotenv').config();

const { sequelize } = require('./sequelize/config');
const app = require('./app');

(async () => {
  try {
    // await sequelize.authenticate();

    // console.log('Database authenticated successfully.');

    await sequelize.sync();

    console.log('Database connected successfully.');

    await app.listen(process.env.PORT);

    console.log(`Server is running on http://localhost:${process.env.PORT}`);
  } catch (error) {
    console.error('Failed to start the application:', error);
    await sequelize.close();
    process.exit(1);
  }
})();
