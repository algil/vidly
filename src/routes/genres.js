const express = require('express');
const Joi = require('joi');
const data = require('../data');

const router = express.Router();

router.get('/', (req, res) => {
  res.send(data.genres);
});

router.get('/:id', (req, res) => {
  const genre = data.genres.find(genre => genre.id === +req.params.id);
  if (!genre) return res.status(404).send('Genre not found with specified id');

  res.send(genre);
});

router.post('/', (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error);

  const genre = {
    id: data.genres.length + 1,
    name: req.body.name
  };
  data.genres.push(genre);
  res.send(genre);
});

router.put('/:id', (req, res) => {
  const genre = data.genres.find(genre => genre.id === +req.params.id);
  if (!genre) return res.status(404).send('Genre not found with specified id');

  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error);

  genre.name = req.body.name;
  res.send(genre);
});

router.delete('/:id', (req, res) => {
  const index = data.genres.findIndex(genre => genre.id === +req.params.id);
  if (index === -1)
    return res.status(404).send('Genre not found with specified id');
  const genre = data.genres.splice(index, 1);
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
