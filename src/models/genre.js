'use strict';

const mongoose = require('mongoose');
const Joi = require('joi');

const Genre = mongoose.model(
  'Genre',
  new mongoose.Schema({
    name: {
      type: String,
      minlength: 3,
      maxlength: 50,
      required: true
    }
  })
);

function validate(genre) {
  const schema = {
    name: Joi.string()
      .min(3)
      .max(50)
      .required()
  };
  return Joi.validate(genre, schema);
}

module.exports = {
  Genre,
  validate
};
