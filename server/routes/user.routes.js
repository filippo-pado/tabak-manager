var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  jwt = require('jsonwebtoken'),
  User = require('../models/User.js');
dns = require('dns');

/*
POST /login
*/

/* LOGIN */
router.post('/login', function (req, res) {
  //User.findOne({ username: req.body.username.toLowerCase()}, 'username hashedPassword', function (err, user) {
  User.findOne({}, 'username hashedPassword', function (err, user) {
    if (err) return next(err);
    if (!user) {
      return res.status(401).send('Authentication failed. User not found.');
    }
    if (req.body.password && req.body.password !== '') {
      if (user.comparePassword(req.body.password)) {
        return res.json(successResponse(user, false));
      }
      return res.status(401).send('Authentication failed. Wrong password.');
    } else {
      if (!process.env.TRUSTEDHOST) {
        return res.status(401).send('Authentication failed. Must provide password.');
      } else {
        const options = {
          family: 6,
          hints: dns.ADDRCONFIG | dns.V4MAPPED,
        };
        dns.lookup(process.env.TRUSTEDHOST, options, (err, address) => {
          if (err) return res.status(401).send('Authentication failed. Host not found.');
          /*console.log('address found: %s', address);
          console.log('address request: %s', req.connection.remoteAddress);*/
          if (address === req.connection.remoteAddress) {
            return res.json(successResponse(user, true));
          }
          return res.status(401).send('Authentication failed. Not trusted.');
        });
      }
    }
  });
});

function successResponse(user, trusted) {
  let token = jwt.sign({
    username: user.username
  }, process.env.SECRET || 'mysecret', {
    expiresIn: '12h'
  });

  // return the information including token as JSON                   
  return {
    message: 'Authentication successful!',
    token: token,
    trusted: trusted
  };
}

module.exports = router;
