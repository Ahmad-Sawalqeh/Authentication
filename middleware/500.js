/* eslint-disable strict */
'use strict';

module.exports = (err, req, res) => {
  // res.status(500);
  // res.statusMessage = 'Server Error';
  // res.json({ error: error, });
  // next();
  let pageError = { error: err };
  res.statusCode = 500;
  res.statusMessage = 'Server Error';
  res.setHeader('Content-Type', 'application/json');
  res.write( JSON.stringify(pageError) );
  res.end();
};
