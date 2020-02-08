/* eslint-disable strict */
'use strict';

const server = require('./auth/server.js');
const mongoose = require('mongoose');
require('dotenv').config();

const MONGOOSE_URI = process.env.MONGODB_URI;

const mongooseOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

mongoose.connect(MONGOOSE_URI, mongooseOptions)
  .then(() => {
    //connection established successfully
    console.log('Database connected');
  })
  .catch((error) => {
    //catch any error during the initial connection
    console.log('Failed to connect to database: ', error);
  });

server.start();
