const express = require('express');
const mongoose = require('mongoose');

const movies = require('./routes/movies');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const home = require('./routes/home');

const app = express();

// Connect to DB
mongoose.connect('mongodb://localhost/vidly',  { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Connection failed...'));

app.use(express.json());

app.use('/api/movies', movies);
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/', home);



// Listening on port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}...`));