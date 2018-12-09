'use strict';

const mongoose = require('mongoose');
const Joi = require('joi');

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 50,
    required: true
  }
});

const Genre = mongoose.model('Genre', genreSchema);

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
  genreSchema,
  validate
};
