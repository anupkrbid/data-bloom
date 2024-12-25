const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const {
  badRequestMiddleware,
  anyErrorMiddleware,
  corsMiddleware
} = require('./global-middlewares');

const { authRoutes } = require('./api/v1/routes');

const app = express();

app.use(morgan('dev'));

// app.use('/uploads', express.static('uploads'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(corsMiddleware);

app.get('/', (req, res, next) => {
  res.send('Data Bloom');
});

app.use('/api/v1/auth', authRoutes);
// app.use('/api/v1/users', UserRoutes);

app.use(badRequestMiddleware);
app.use(anyErrorMiddleware);

module.exports = app;
