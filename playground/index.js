const config = require('config');
const debug = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');

const courses = require('./routes/courses')
const home = require('./routes/home')
const logger = require('./middleware/logger');

const app = express();

// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
// console.log(`app: ${app.get('env')}`);

app.set('view engine', 'pug');
app.set('views', './views'); //default

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/courses', courses);
app.use('/', home);

// Configuration
console.log('Application name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
//console.log('Mail Password: ' + config.get('mail.password'));

if(app.get('env')==='development'){
  app.use(morgan('tiny'));
   console.log('Morgan enabled..');
  //debug('Morgan enabled..');
}

// Connect to DB
mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Connection failed...'));
//dbDebugger('Connected to database..');

app.use(logger);

app.use('/api/admin', (req, res, next) => {
  console.log('Authenticating...');
  next();
});

// Listening on port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}...`));