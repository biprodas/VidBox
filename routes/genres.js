const express = require('express');
const { Genre, validate } = require('../models/genre');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const validateObjectId = require("../middleware/validateObjectId");


const router = express.Router();

// get all the genres
router.get('/', async (req, res) => {
  const genres = await Genre.find().sort('name');
  res.send(genres);
});

// get a genre by id
router.get("/:id", validateObjectId, async (req, res) => {
  const genre = await Genre.findById(req.params.id).select("-__v");
  if (!genre) return res.status(404).send("The genre with the given ID was not found.");

  res.send(genre);
});


// create a new genre
router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();

  res.send(genre);
});

router.put("/:id", [auth, validateObjectId], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(req.params.id, { 
    name: req.body.name 
  }, { new: true });

  if (!genre) return res.status(404).send("The genre with the given ID was not found.");

  res.send(genre);
});

// delete a genre by id
router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const genre = await Genre.findByIdAndDelete(req.params.id);

  if (!genre) return res.status(404).send("The genre with the given ID was not found.");

  res.send(genre);
});


module.exports = router;