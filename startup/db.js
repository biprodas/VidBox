const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function(){
  mongoose.connect('mongodb://localhost/vidly',  { useNewUrlParser: true, useCreateIndex: true })
    .then(() => winston.info('Connected to MongoDB...'));
    //.catch(err => console.error('Connection failed...'));
}