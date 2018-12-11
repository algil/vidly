'use strict';

const express = require('express');
const bcrypt = require('bcrypt');
const { pick } = require('lodash');
const { User, validate } = require('../models/user');

const router = express.Router();

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send('User already registered');
  }

  user = new User(pick(req.body, 'name', 'email', 'password'));

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  res.send(pick(user, '_id', 'name', 'email'));
});

module.exports = router;