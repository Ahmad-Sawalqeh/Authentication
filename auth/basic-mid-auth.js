/* eslint-disable strict */
'use strict';

const base64 = require('base-64');
const users = require('./users.js');

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    next(' Invalid Login Process ');
    return;
  }
  let auth2ndElement = req.headers.authorization;
  let basic = auth2ndElement.split(' ').pop();
  let [user, pass] = base64.decode(basic).split(':');
  users.authenticateUser(user, pass)
    .then(isValidUser => {
      req.token = users.generatToken(isValidUser);
    })
    .catch(err => {
      next(' Invalid User Error => ', err);
    });
};
