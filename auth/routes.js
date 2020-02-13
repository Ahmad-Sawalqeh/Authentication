/* eslint-disable new-cap */
/* eslint-disable strict */
'use strict';

const express = require('express');
const router = express.Router();

// Auth
// const bcrypt = require('bcrypt');
const basicAuth = require('./basic-mid-auth.js');
const oauthMiddle = require('../oauth/oauth-middleware.js');
const User = require('./users.js');

router.post('/signup', signUp);
router.post('/signin', basicAuth, signIn);
router.get('/user', getUser);
router.get('/oauth', oauthMiddle, oauth);

function signUp (req, res, next){
  let users = new User(req.body);
  users.save()
    .then(user => {
      res.status(200).send(user);
    })
    .catch(next);
}

function signIn (req,res){
  res.status(200).send(req.token);
}

function getUser(req, res, next) {
  User.list()
    .then(data => {
      res.status(200).json(data);
    });
}

function oauth(req, res, next) {
  // console.log('hello',req.body);
  res.json(req.token);
}

module.exports = router;
