'use strict';

const server = require('./auth/server.js');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const MONGOOSE_URI='mongodb://localhost:27017/serverVir'

dotenv.config();
//const MONGOOSE_URI = 'mongodb://localhost:27017/class08';

mongoose.connect(MONGOOSE_URI, { useNewUrlParser: true, useCreateIndex:true,useUnifiedTopology:true });

server.start();