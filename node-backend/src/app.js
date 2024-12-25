const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const {
  badRequestMiddleware,
  anyErrorMiddleware,
  corsMiddleware
} = require('./global-middlewares');

const app = express();

app.use(morgan('dev'));

// app.use('/uploads', express.static('uploads'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(corsMiddleware);

app.get('/', (req, res, next) => {
  res.send('Data Bloom');
});

app.use(badRequestMiddleware);
app.use(anyErrorMiddleware);

module.exports = app;
