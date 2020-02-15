/* eslint-disable indent */
/* eslint-disable new-cap */
/* eslint-disable strict */
'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
// const base64 = require('base-64');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // output as a json format
// let user = require('./schema.js');

const User = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  rule : {type : String , require : true , enum:['read' ,'create', 'update' , 'superuser']},
});

// {
//   "username": "ahmad",
//   "password": "123456789",
//   "rule": "create"
// }

let SECRET = process.env.SECRET || 'MYOWNSECRET';

User.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 5);
  }
  return Promise.reject();
});

User.statics.authenticater = function (auth) {
  let query = { username: auth.user };
  // console.log('statics.authenticater query => ',auth);
  return this.findOne(query)
    .then(user => {
      // console.log('user from DB => ',user);
      return user.passwordComparator(auth.pass);
      // return bcrypt.compare(auth.pass, this.password);
    })
    // .then(valid => {
    //   return valid ? this : null;
    // })
    .catch(console.error);
};

User.methods.passwordComparator = function (pass) {
  return bcrypt.compare(pass, this.password)
    .then(valid => {
      return valid ? this : null;
    });
};

User.statics.tokenGenerator = function (user) {
  let token = {
    id: user._id,
    permission: user.rule,
  };
  // return jwt.sign({ id: user.id}, process.env.SECRET, { expiresIn: 60 * 15});
  // return jwt.sign(token, SECRET, {expiresIn: '15m'});
  return jwt.sign(token, SECRET );
};

User.statics.list = async function () {
  let result = await this.find({});
  return result;
};

User.statics.authenticateToken = async function (token) {
  try {
    // console.log('token => ',token);
      let tokenObject = jwt.verify(token, SECRET);

      // console.log('tokenObject => ',tokenObject);
      if (tokenObject.username) {
          return Promise.resolve(tokenObject);
      } else {
          return Promise.reject();
      }
  } catch (e) {
      return Promise.reject();
  }
};

module.exports = mongoose.model('User', User);

  // User.pre('save', async function(){
  //   try {
  //     this.password = await bcrypt.hash(this.password, 5);
  //     console.log('from pre => ',this.password);
  //   }catch(e){
  //     return Promise.reject();
  //   }
  // });

  // User.statics.authenticateUser = async function(user,pass){
  //   // should check database password with new sign-in password
  //   console.log(user,pass);
  //   return this.findOne({ username: user })
  //     .then(user => {
  //       console.log('user => ', user, '\npass => ', pass);
  //       let isValid = bcrypt.compare(pass, this.password); //sign in
  //       console.log('(this.pasword) from authenticateUser => ',this.password);
  //       return isValid ? user : Promise.reject();
  //     })
  //     .catch(() => {
  //       return Promise.reject();
  //     });
  // };

  // User.methods.generatToken = function(user){
  //   return jwt.sign({ id: user._id }, SECRET);
  // };