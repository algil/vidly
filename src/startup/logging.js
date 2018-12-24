'use strict';

// require('express-async-errors');
const logger = require('../utils/logger');

module.exports = () => {
  process.on('uncaughtException', error => {
    console.error(error);
    // logger.error(error.message, error);
  });

  process.on('unhandledRejection', error => {
    console.error(error);
    // logger.error(error.message, error);
  });
};
