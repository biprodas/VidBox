const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const home = require('./routes/home');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const genres = require('./routes/genres');
const rentals = require('./routes/rentals');

const app = express();

// Connect to DB
mongoose.connect('mongodb://localhost/vidly',  { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Connection failed...'));

app.use(express.json());

app.use('/', home);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/genres', genres);
app.use('/api/rentals', rentals);



// Listening on port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}...`));