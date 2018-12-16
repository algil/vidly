'use strict';

const mongoose = require('mongoose');
const config = require('config');
const logger = require('../utils/logger');

module.exports = async () => {
  const db = config.get('db');
  mongoose.set('useCreateIndex', true);
  await mongoose.connect(
    db,
    { useNewUrlParser: true }
  );
  logger.info(`Connected to ${db}`);
};
