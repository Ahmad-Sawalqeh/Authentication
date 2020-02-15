/* eslint-disable strict */
'use strict';

module.exports = (rule) => {

  return (req, res, next) => {
    console.log(req.body);
    try {
      if (req.user.rule.includes(rule)) {
        next();
      }
      else {
        next('You don\'t have privilege!');
      }
    } catch (e) {
      next('Invalid acl Login');
    }

  };

};
