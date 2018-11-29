'use strict';

const express = require('express');
const Joi = require('joi');
const data = require('./data');

const app = express();

app.use(express.json());

app.get('/api/genres', (req, res) => {
  res.send(data.genres);
});

app.get('/api/genres/:id', (req, res) => {
  const genre = data.genres.find(genre => genre.id === +req.params.id);
  if (!genre) return res.status(404).send('Genre not found with specified id');

  res.send(genre);
});

app.post('/api/genres', (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error);

  const genre = {
    id: data.genres.length + 1,
    name: req.body.name
  };
  data.genres.push(genre);
  res.send(genre);
});

app.put('/api/genres/:id', (req, res) => {
  const genre = data.genres.find(genre => genre.id === +req.params.id);
  if (!genre) return res.status(404).send('Genre not found with specified id');

  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error);

  genre.name = req.body.name;
  res.send(genre);
});

app.delete('/api/genres/:id', (req, res) => {
  const index = data.genres.findIndex(genre => genre.id === +req.params.id);
  if (index === -1)
    return res.status(404).send('Genre not found with specified id');
  const genre = data.genres.splice(index, 1);
  res.send(genre);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listen on port ${port}`);
});

function validateGenre(genre) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };
  return Joi.validate(genre, schema);
}
