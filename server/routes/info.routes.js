var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Info = require('../models/Info.js');

/*
  GET /
  GET /categories
  POST /
*/

/* GET ALL INFO */
router.get('/', function (req, res, next) {
  Info.findOne(function (err, info) {
    if (err) return next(err);
    res.json(info);
  });
});

/* POST INFO */
router.post('/category', function (req, res, next) {
  console.log(JSON.stringify(req.body, null, 2));
  Info.findOneAndUpdate({}, { $push: { categories: req.body } }, { new: true }, function (err, info) {
    if (err) return next(err);
    res.json(info);
  });
});

module.exports = router;