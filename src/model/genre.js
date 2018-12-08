'use strict';

const mongoose = require('mongoose');

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

module.exports = Genre;
