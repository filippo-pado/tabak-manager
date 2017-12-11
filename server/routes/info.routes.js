var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Info = require('../models/Info.js');

/*
  GET /
  POST /
*/

/* GET INFO */
router.get('/', function(req, res, next) {
  Info.find(function(err, info) {
    if (err) return next(err);
    res.json(info);
  });
});

/* POST INFO */
router.post('/', function(req, res, next) {
  Info.create(req.body, function(err, info) {
    if (err) return next(err);
    res.json(info);
  });
});

module.exports = router;
