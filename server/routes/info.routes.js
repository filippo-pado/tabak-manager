var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Info = require('../models/Info.js');

/*
  GET /
*/

/* GET ALL INFO */
router.get('/', function (req, res, next) {
  Info.findOne(function (err, info) {
    if (err) return next(err);
    res.json(info);
  });
});

module.exports = router;