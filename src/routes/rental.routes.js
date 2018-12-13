'use strict';

const express = require('express');
const { pick } = require('lodash');
const { Customer } = require('../models/customer');
const { Movie } = require('../models/movie');
const { Rental, validate } = require('../models/rental');

const router = express.Router();

router.get('/', async (req, res) => {
  const rentals = await Rental.find().sort('-dateOut');
  res.send(rentals);
});

router.post('/', auth, async (req, res) => {
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

  const rental = new Rental({
    customer: pick(customer, '_id', 'name', 'phone'),
    movie: pick(customer, '_id', 'title', 'dailyRentalRate')
  });

  const session = await Rental.startSession();
  session.startTransaction();

  try {
    rental = await rental.save();

    movie.numberInStock--;
    movie.save();

    await session.commitTransaction();
    session.endSession();

    return res.send(rental);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.error(error);
    return res.status(500).send(error.message);
  }
});

module.exports = router;
