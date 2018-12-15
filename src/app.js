'use strict';

require('express-async-errors');
const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const logger = require('./utils/logger');

const errorMiddleware = require('./middleware/error.middleware');

const genresRoutes = require('./routes/genres.routes');
const customerRoutes = require('./routes/customer.routes');
const movieRoutes = require('./routes/movie.routes');
const rentalRoutes = require('./routes/rental.routes');
const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');

process.on('uncaughtException', error => {
  logger.error(error.message, error);
});

process.on('unhandledRejection', error => {
  logger.error(error.message, error);
});

if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined.');
  process.exit(1);
}

const app = express();

mongoose.set('useCreateIndex', true);
mongoose.connect(
  'mongodb://localhost/vidly',
  { useNewUrlParser: true }
);

app.use(express.json());

app.use('/api/genres', genresRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/rentals', rentalRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use(errorMiddleware);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listen on port ${port}`);
});
