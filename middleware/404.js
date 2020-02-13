/* eslint-disable strict */
'use strict';

module.exports = (req, res) => {
  // res.status(404);
  // res.statusMessage = 'Not Found!';
  // res.json({ error:'Not Found!', });
  // next();
  let error = { error: 'Not Found' };
  res.statusCode = 404;
  res.statusMessage = 'Not Found';
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(error));
  res.end();
};
