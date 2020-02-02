/* eslint-disable strict */
'use strict';

const express = require('express');
const morgan = require('morgan');

// Auth
const basicAuth = require('./basic-mid-auth.js');
const users = require('./users.js');


const app = express();

// use logger
const loggerReq = require('./logger.js');
app.use(loggerReq);

// errors
const err404 = require('../middleware/404.js');
const err500 = require('../middleware/500.js');

app.use(err404);
app.use(err500);

app.use(express.json());
app.use(morgan('dev'));

/********************* router */
app.post('/signup',(req,res) =>
{
  users.save(req.body)
    .then(user => {
      let token = users.genToken(user);
      res.status(200).send(token);
    })
    .catch(err => console.error(err));

}); // end of signup route

app.post('/signin',basicAuth,(req,res) =>
{
  res.status(200).send(req.token);
}); // end of signup route

// out all users list in db
app.get('/users',basicAuth,(req,res) =>
{
  res.status(200).json(users.list);
}); // end of signup route


// Server listening
module.exports = {
  server : app,
  start : port => {
    let PORT = port || process.env.PORT || 8080;
    app.listen(PORT , ()=> console.log(`The App Is a live and Listening on Port No.${PORT}`));
  },
};