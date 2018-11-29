'use strict';

const express = require('express');
const genresRoutes = require('./routes/genres');

const app = express();

app.use(express.json());

app.use('/api/genres', genresRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listen on port ${port}`);
});
