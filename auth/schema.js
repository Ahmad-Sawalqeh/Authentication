/* eslint-disable new-cap */
/* eslint-disable strict */
'use strict';

const mongoose = require('mongoose');

const User = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: Number, required: true },
});

module.exports = mongoose.model('User', User);
