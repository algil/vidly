'use strict';

const express = require('express');
const { Customer } = require('../models/customer');
const { Movie } = require('../models/movie');
const { Rental, validate } = require('../models/rental');

const router = express.Router();

router.get('/', async (req, res) => {
  const rentals = await Rental.find().sort('-dateOut');
  res.send(rentals);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) {
    return res.status(400).send('Invalid customer');
  }

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) {
    return res.status(400).send('Invalid movie');
  }

  if (movie.numberInStock === 0) {
    return res.status(400).send('Movie not in stock');
  }

  const rentals = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate
    }
  });
  await rentals.save();

  movie.numberInStock--;
  await movie.save();

  res.send(rentals);
});

module.exports = router;
