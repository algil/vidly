'use strict';

const mongoose = require('mongoose');
const logger = require('../utils/logger');

module.exports = async () => {
  mongoose.set('useCreateIndex', true);
  await mongoose.connect(
    'mongodb://localhost/vidly',
    { useNewUrlParser: true }
  );
  logger.info('Connected to MongoDB');
};
