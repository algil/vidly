'use strict';

require('express-async-errors');
const logger = require('../utils/logger');

module.exports = () => {
  process.on('uncaughtException', error => {
    logger.error(error.message, error);
  });

  process.on('unhandledRejection', error => {
    logger.error(error.message, error);
  });
};
