'use strict';

module.exports = function(error, req, res, next) {
  // TODO: Log error
  res.status(500).send('Something failed.');
};
