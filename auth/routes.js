/* eslint-disable new-cap */
/* eslint-disable strict */
'use strict';

const express = require('express');
const router = express.Router();

// Auth
const basicAuth = require('./basic-mid-auth.js');
const User = require('./users.js');

router.post('/signup', signUp);
router.post('/signin', basicAuth, signIn);
router.get('/users', basicAuth, usersList);

function signUp (req, res, next){
  let users = new User(req.body);
  users.save()
    .then(user => {
      let token = users.generatToken(user);
      res.status(200).send(token);
    })
    .catch(next);
}

function signIn (req,res){
  res.status(200).send(req.token);
}

function usersList (req,res){
  res.status(200).json(User.list);
}

module.exports = router;
