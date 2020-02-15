/* eslint-disable strict */
'use strict';

const Users = require('../auth/users.js');

module.exports = (req, res, next) => {
  if (!req.headers.authorization) { next('No req.header.authorization!'); }

  let token = req.headers.authorization.split(' ').pop();
  // console.log('bearer auth => ', token);

  Users.authenticateToken(token)
    .then(validUser =>{
      req.user = validUser;
      // console.log('req.user => ',req.user);
      next();
    })
    .catch(e => next(e));
};
