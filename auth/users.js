/* eslint-disable new-cap */
/* eslint-disable strict */
'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken'); // output as a json format
// let user = require('./schema.js');

const User = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: Number, required: true },
});

// {
//   "username": "ahmad",
//   "password": "123456789"
// }

let SECRET = process.env.SECRET;

User.pre('save', async function(){
  // if (this.isModified('password')) {
  // hash the password and save it on our db by username object
  // this.password = await bcryptjs.hash(this.password, 5);
  // }
  try {
    this.password = await bcryptjs.hash(this.password, 5);
  }catch(e){
    // throw new Error('did not save');
    return Promise.reject();
  }
});

User.statics.authenticateUser = async function(user,pass){
  let valid = bcryptjs.compare(pass,this.password);
  return valid ? user : Promise.reject();
};

User.methods.generatToken = function(){
  let username = {
    id: this._id,
  };
  let token = jwt.sign(username, SECRET);
  return token;
};

User.methods.list = () => this.schema.find({});

module.exports = mongoose.model('User', User);
