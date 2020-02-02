/* eslint-disable strict */
'use strict';

// to encrypt the password
const bcryptjs = require('bcryptjs');
// make the output as a json format
const jwt = require('jsonwebtoken');

let SECRET='NAR9288';
// const dotenv = require('dotenv');
// dotenv.config();

// save all users
let db = {};
// each user information
let users = {};

users.save = async function(userObjInfo){

  // check if the user on our db
  if(!db[userObjInfo.username]){
    // hash the password and save it on our db by username object
    // 5 it is the complexity or salt for hash complication hashing
    userObjInfo.password = await bcryptjs.hash(userObjInfo.password,5);

    // save the whole userinfo( username, password ) into DB by the username
    db[userObjInfo.username] = userObjInfo;

    return userObjInfo;
  } // end of if statement

  return Promise.reject();

} // end of users save function


// give auth to user 
users.authenticateUser = async function(user,pass){
  // bring the user's data from DB then check the validity of it
  let valid = await bcryptjs.compare(pass,db[user].password);
  // if user exist  return it , otherwise reject
  return valid ? db[user]:Promise.reject();
} // end of authenticateUser function

// generate a new token
users.genToken = function(user){
  let token = jwt.sign({ username:user.username},SECRET);
  return token;
} // end of genToken function

// make the db as a property from users
users.list = () => db;

module.exports = users;