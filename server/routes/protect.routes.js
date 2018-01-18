var express = require('express'),
  jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  let auth_header = req.headers['authorization'];
  if (typeof auth_header === 'string') {
    var token = req.headers['authorization'].split(' ')[1];
    jwt.verify(token, process.env.SECRET || 'mysecret', function (err, decoded) {
      if (err) {
        return res.status(401).send('Failed to authenticate token. Error: ' + err.message);
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    return res.status(403).send('No token provided.');
  }
};
