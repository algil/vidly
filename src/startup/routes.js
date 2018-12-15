'use strict';

const genresRoutes = require('../routes/genres.routes');
const customerRoutes = require('../routes/customer.routes');
const movieRoutes = require('../routes/movie.routes');
const rentalRoutes = require('../routes/rental.routes');
const userRoutes = require('../routes/user.routes');
const authRoutes = require('../routes/auth.routes');
const errorMiddleware = require('../middleware/error.middleware');

module.exports = app => {
  app.use('/api/genres', genresRoutes);
  app.use('/api/customers', customerRoutes);
  app.use('/api/movies', movieRoutes);
  app.use('/api/rentals', rentalRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/auth', authRoutes);
  app.use(errorMiddleware);
};
