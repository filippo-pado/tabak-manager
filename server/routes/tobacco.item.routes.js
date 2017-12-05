var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  TobaccoItem = require('../models/TobaccoItem.js');

/*
  GET /
  POST /

  GET /:id
  PUT /:id
  DELETE /:id
*/

/* GET ALL ITEMS */
router.get('/', function(req, res, next) {
  TobaccoItem.find(function(err, tobaccoItems) {
    if (err) return next(err);
    res.json(tobaccoItems);
  });
});

/* SAVE ITEM */
router.post('/', function(req, res, next) {
  TobaccoItem.create(req.body, function(err, tobaccoItem) {
    if (err) return next(err);
    res.json(tobaccoItem);
  });
});

/* GET SINGLE ITEM BY ID */
router.get('/:id', function(req, res, next) {
  TobaccoItem.findById(req.params.id, function(err, tobaccoItem) {
    if (err) return next(err);
    res.json(tobaccoItem);
  });
});

/* UPDATE ITEM */
router.put('/:id', function(req, res, next) {
  TobaccoItem.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(err, tobaccoItem) {
    if (err) return next(err);
    res.json(tobaccoItem);
  });
});

/* DELETE ITEM */
router.delete('/:id', function(req, res, next) {
  TobaccoItem.findByIdAndRemove(req.params.id, req.body, function(err, tobaccoItem) {
    if (err) return next(err);
    res.json(tobaccoItem);
  });
});

module.exports = router;
