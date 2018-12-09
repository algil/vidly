'use strict';

const mongoose = require('mongoose');
const Joi = require('joi');
const { genreSchema } = require('./genre');

const Movie = mongoose.model(
  'Movie',
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 255
    },
    numberInStock: {
      type: Number,
      required: true,
      min: 0,
      max: 255,
      default: 0
    },
    dailyRentalRate: {
      type: Number,
      required: true,
      min: 0,
      max: 255,
      default: 0
    },
    genre: {
      type: genreSchema,
      required: true
    }
  })
);

function validate(movie) {
  const schema = {
    title: Joi.string()
      .required()
      .min(3)
      .max(255),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(255),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(255),
    genreId: Joi.objectId().required()
  };
  Joi.validate(movie, schema);
}

module.exports = {
  Movie,
  validate
};
