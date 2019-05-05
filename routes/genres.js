const express = require('express');
const Joi = require('joi');

const router = express.Router();

const genres = [
  { id: 1, name: 'Action' },
  { id: 2, name: 'Horror' },
  { id: 3, name: 'Romance' }
]

// get all the genres
router.get('/', (req, res) => {
  res.send(genres);
});

// create a new genre
router.post('/', (req, res) => {
  // Validation
  const { error } = validateGenre(req.body);
  if(error) return res.status(404).send(error.details[0].message);

  const genre = {
    id: genres.length + 1,
    name: req.body.name
  };
  genres.push(genre);
  res.send(genre);
});

// get a genre by id
router.get('/:id', (req, res) => {
  const genre = genres.find(c => c.id === parseInt(req.params.id));
  if(!genre) return res.status(404).send('The genre with the given ID wan not found');
  res.send(genre);
});

// update genre by id
router.put('/:id', (req, res) => {
  // Look up for the genre
  const genre = genres.find(c => c.id === parseInt(req.params.id));
  // if not existing, return 404
  if(!genre) return res.status(404).send('The genre with the given ID wan not found');

  // Validation
  const { error } = validateGenre(req.body);
  //if invalid, return 400 - Bad request
  if(error) return res.status(404).send(error.details[0].message);

  // Update genre
  genre.name = req.body.name;
  // Return the updated genre
  res.send(genre);
});

// delete a user by id
router.delete('/:id', (req, res) => {
  // Look up for the genre
  const genre = genres.find(c => c.id === parseInt(req.params.id));
  // if not existing, return 404
  if(!genre) return res.status(404).send('The genre with the given ID wan not found');

  // Delete
  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  // Return the deleted genre
  res.send(genre);
})


function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required()
  }
  return Joi.validate(genre, schema);
}


module.exports = router;