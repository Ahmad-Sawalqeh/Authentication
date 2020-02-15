/* eslint-disable strict */
'use strict';

require('dotenv').config();
const base64 = require('base-64');
const User = require('./users.js');
// const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    next('invalid login Process');
    return;
  }
  let basic = req.headers.authorization.split(' ').pop();
  let [user, pass] = base64.decode(basic).split(':');
  let auth = { user, pass };
  console.log('basic auth => ', basic);
  User.authenticater(auth)
    .then(validUser => {
      req.token = User.tokenGenerator(validUser);
      console.log('req.token => ',req.token);
      next();
    })
    .catch(() => next('invalid login'));
};
