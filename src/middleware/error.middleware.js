'use strict';

const logger = require('../utils/logger');

module.exports = function(error, req, res, next) {
  // logger.error(error.message, error);
  console.error(error);
  res.status(500).send('Something failed.');
};
