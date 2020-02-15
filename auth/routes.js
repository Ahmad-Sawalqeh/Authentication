/* eslint-disable new-cap */
/* eslint-disable strict */
'use strict';

const express = require('express');
const router = express.Router();

// Auth
// const bcrypt = require('bcrypt');
const basicAuth = require('./basic-mid-auth.js');
const oauthMiddle = require('../oauth/oauth-middleware.js');
const bearerMiddle = require('../bearer/bearer-middleware.js');
const aclMiddle = require('../acl/acl-middleware.js');
const User = require('./users.js');

router.post('/signup', signUp);
router.post('/signin', basicAuth, bearerMiddle, signIn);
router.get('/users', getUser);
router.get('/oauth', oauthMiddle, oauth);
router.get('/user', bearerMiddle, bearer);

/*******************  ACL RULES ********************/
router.get('/readonly' , bearerMiddle , aclMiddle('read') , (req , res) => {
  res.status(200).send('you have permission to Read Only !');
});

router.get('/create' , bearerMiddle , aclMiddle('create') , (req , res) => {
  res.status(200).send('you have permission to Create Only !');
});

router.get('/update' , bearerMiddle , aclMiddle('update') , (req , res) => {
  res.status(200).send('you have permission to Update !!');
});

router.get('/delete' , bearerMiddle , aclMiddle('update') , (req , res) => {
  res.status(200).send('you have permission to Delete !');
});

router.get('/everything' , bearerMiddle , aclMiddle('superuser') , (req , res) => {
  res.status(200).send('you have Admin privilege!!');
});
/***************************************/

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
  res.json(req.token);
}

function bearer(req, res, next) {
  // console.log('bearer function req.user => ',req.usre);
  res.status(200).json(req.user);
}

module.exports = router;
