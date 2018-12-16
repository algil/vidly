'use strict';

const express = require('express');
const logger = require('./utils/logger');

const app = express();

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();

app.use(express.json());

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  logger.info(`Listen on port ${port}`);
});

module.exports = server;
