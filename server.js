const express = require('express');
const winston = require('winston');



const app = express();

require('./startup/logging');
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();


// Listening on port
const port = process.env.PORT || 5000;
app.listen(port, () => winston.info(`Server running on port ${port}...`));