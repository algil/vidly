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
app.listen(port, () => {
  logger.info(`Listen on port ${port}`);
});
