const express = require('express');
const Joi = require('joi');
const Genre = require('../model/genre');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const genres = await Genre.find();
    res.send(genres);
  } catch (error) {
    console.error(error);
  }
});

router.get('/:id', async (req, res) => {
  const genre = await Genre.findById(req.param.id);
  if (!genre) return res.status(404).send('Genre not found with specified id');

  res.send(genre);
});

router.post('/', async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error);

  const genre = new Genre({
    name: req.body.name
  });
  await genre.save();

  res.send(genre);
});

router.put('/:id', async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error);

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  if (!genre) return res.status(404).send('Genre not found with specified id');

  res.send(genre);
});

router.delete('/:id', async (req, res) => {
  const genre = await Genre.findByIdAndDelete(req.params.id);
  if (!genre) return res.status(404).send('Genre not found with specified id');

  res.send(genre);
});

function validateGenre(genre) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };
  return Joi.validate(genre, schema);
}

module.exports = router;
