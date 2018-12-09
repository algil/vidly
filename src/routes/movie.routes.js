'use strict';

const express = require('express');
const { Genre } = require('../models/genre');
const { Movie, validate } = require('../models/movie');

const router = express.Router();

router.get('/', async (req, res) => {
  const movies = await Movie.find();
  res.send(movies);
});

router.get('/:id', async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) {
    return res.status(404).send('Movie not found with specified id');
  }

  res.send(movie);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const genre = await Genre.findById(genreId);
  if (!genre) {
    return res.status(400).send('Invalid genre');
  }

  const movie = new Movie({
    title: req.body.title,
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
    genre: {
      _id: genre._id,
      name: genre.name
    }
  });

  await movie.save();
  res.send(movie);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const genre = await Genre.findById(genreId);
  if (!genre) {
    return res.status(400).send('Invalid genre');
  }

  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
      genre: {
        _id: genre._id,
        name: genre.name
      }
    },
    {
      new: true
    }
  );

  if (!movie) {
    return res.status(404).send('Movie not found with specified id');
  }

  res.send(movie);
});

router.delete('/:id', async (req, res) => {
  const movie = await Movie.findByIdAndDelete(req.params.id);

  if (!movie) {
    return req.status(404).send('Movie not found with specified id');
  }

  res.send(movie);
});

module.exports = router;
