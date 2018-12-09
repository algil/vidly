'use strict';

const express = require('express');
const mongoose = require('mongoose');
const genresRoutes = require('./routes/genres.routes');
const customerRoutes = require('./routes/customer.routes');
const movieRoutes = require('./routes/movie.routes');

const app = express();

mongoose.connect(
  'mongodb://localhost/vidly',
  { useNewUrlParser: true }
);

app.use(express.json());

app.use('/api/genres', genresRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/movies', movieRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listen on port ${port}`);
});
