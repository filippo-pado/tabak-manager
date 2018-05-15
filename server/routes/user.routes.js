var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  jwt = require('jsonwebtoken'),
  User = require('../models/User.js'),
  dns = require('dns'),
  ExpressBrute = require('express-brute'),
  MongooseStore = require('express-brute-mongoose'),
  BruteForce = require('../models/BruteForce');

var store = new MongooseStore(BruteForce);
var bruteforce = new ExpressBrute(store);


/*
POST /login
*/

/* LOGIN */
router.post('/login', bruteforce.prevent, function (req, res) {
  //User.findOne({ username: req.body.username.toLowerCase()}, 'username hashedPassword', function (err, user) {
  User.findOne({}, 'username hashedPassword', function (err, user) {
    if (err) return next(err);
    if (!user) {
      return res.status(401).send('Authentication failed. User not found.');
    }
    if (req.body.password && req.body.password !== '') {
      if (user.comparePassword(req.body.password)) {
        return req.brute.reset(function () {
          res.json(successResponse(user, false));
        })
      }
      return res.status(401).send('Authentication failed. Wrong password.');
    } else {
      if (!process.env.TRUSTEDHOST) {
        return res.status(401).send('Authentication failed. Must provide password.');
      } else {
        dns.lookup(process.env.TRUSTEDHOST, 4, (err, address) => {
          /*console.log('address found: %s', address);
          console.log('address request: %s', req.connection.remoteAddress);*/
          if (address && address === req.connection.remoteAddress) {
            return req.brute.reset(function () {
              res.json(successResponse(user, true));
            })
          }
          const options = {
            family: 6,
            hints: dns.V4MAPPED,
          };
          dns.lookup(process.env.TRUSTEDHOST, options, (err, address) => { //retry with ipv6
            /*console.log('address found: %s', address);
            console.log('address request: %s', req.connection.remoteAddress);*/
            if (address && address === req.connection.remoteAddress) {
              return req.brute.reset(function () {
                res.json(successResponse(user, true));
              })
            }
            return res.status(401).send('Authentication failed. Not trusted.');
          });
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
