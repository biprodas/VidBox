const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const home = require('./routes/home');
const auth = require('./routes/auth');
const users = require('./routes/users');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const genres = require('./routes/genres');
const rentals = require('./routes/rentals');

const app = express();

if(!config.get('jwtPrivateKey')){
  console.log('FATAL ERROR: jwtPrivateKey is not defined.');
  process.exit(1);
}

// Connect to DB
mongoose.connect('mongodb://localhost/vidly',  { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Connection failed...'));

app.use(express.json());

app.use('/', home);
app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/genres', genres);
app.use('/api/rentals', rentals);



// Listening on port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}...`));