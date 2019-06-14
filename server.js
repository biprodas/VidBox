const express = require('express');
const winston = require('winston');
const config = require("config");


const app = express();

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();


// Listening on port
const port = process.env.PORT || config.get("port");
const server = app.listen(port, () => 
  winston.info(`Server running on port ${port}...`)
);

module.exports  = server;
