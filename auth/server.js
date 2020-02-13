/* eslint-disable strict */
'use strict';

require('dotenv').config();
const express = require('express');
const morgan = require('morgan');

// errors
const err404 = require('../middleware/404.js');
const err500 = require('../middleware/500.js');

const router = require('./routes.js');

// constants application
const app = express();

// application middelware
app.use(express.json());
app.use(express.static('./public'));
app.use(morgan('dev'));

// routes
app.use(router);

// error middelware
app.use('*', err404);
app.use(err500);

// Server listening
module.exports = {
  server : app,
  start : port => {
    let PORT = port || process.env.PORT || 8080;
    app.listen(PORT , ()=> console.log(`server up ${PORT}`));
  },
};
