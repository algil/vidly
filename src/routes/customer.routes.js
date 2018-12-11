'use strict';

const express = require('express');
const { pick } = require('lodash');
const { Customer, validate } = require('../models/customer');

const router = express.Router();

router.get('/', async (req, res) => {
  const customers = await Customer.find();
  res.send(customers);
});

router.get('/:id', async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) {
    return res.status(404).send('Customer not found with specified id');
  }

  res.send(customer);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const customer = new Customer(pick(req.body, ['name', 'isGold', 'phone']));

  await customer.save();
  res.send(customer);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    pick(req.body, 'name', 'isGold', 'phone'),
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
  const customer = await Rental.findByIdAndDelete(req.params.id);

  if (!customer) {
    return req.status(404).send('Customer not found with specified id');
  }

  res.send(customer);
});

module.exports = router;
