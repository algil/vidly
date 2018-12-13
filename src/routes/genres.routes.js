const express = require('express');
const { Genre, validate } = require('../models/genre');
const auth = require('../middleware/auth.middleware');
const admin = require('../middleware/admin.middleware');

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

router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = new Genre({
    name: req.body.name
  });
  await genre.save();

  res.send(genre);
});

router.put('/:id', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  if (!genre) return res.status(404).send('Genre not found with specified id');

  res.send(genre);
});

router.delete('/:id', [auth, admin], async (req, res) => {
  const genre = await Genre.findByIdAndDelete(req.params.id);
  if (!genre) return res.status(404).send('Genre not found with specified id');

  res.send(genre);
});

module.exports = router;
