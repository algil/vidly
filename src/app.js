'use strict';

const express = require('express');
const mongoose = require('mongoose');
const genresRoutes = require('./routes/genres.route');

const app = express();

mongoose.connect(
  'mongodb://localhost/vidly',
  { useNewUrlParser: true }
);

app.use(express.json());

app.use('/api/genres', genresRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listen on port ${port}`);
});
