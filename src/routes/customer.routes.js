'use strict';

const express = require('express');
const { Movie, validate } = require('../models/customer');

const router = express.Router();

router.get('/', async (req, res) => {
  const customers = await Movie.find();
  res.send(customers);
});

router.get('/:id', async (req, res) => {
  const customer = await Movie.findById(req.params.id);
  if (!customer) {
    return res.status(404).send('Customer not found with specified id');
  }

  res.send(customer);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error);
  }

  const customer = new Movie({
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone
  });

  await customer.save();
  res.send(customer);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error);
  }

  const customer = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      isGold: req.body.isGold,
      phone: req.body.phone
    },
    {
      new: true
    }
  );

  if (!customer) {
    return res.status(404).send('Customer not found with specified id');
  }

  res.send(customer);
});

router.delete('/:id', async (req, res) => {
  const customer = await Movie.findByIdAndDelete(req.params.id);

  if (!customer) {
    return req.status(404).send('Customer not found with specified id');
  }

  res.send(customer);
});

module.exports = router;
