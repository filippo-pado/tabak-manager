var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Item = require('../models/Item.js');

/*
  GET /
  POST /

  GET /:id
  PUT /:id
  DELETE /:id
*/

/* GET ALL ITEMS */
router.get('/', function(req, res, next) {
  Item.find(function(err, items) {
    if (err) return next(err);
    res.json(items);
  });
});

/* SAVE ITEM */
router.post('/', function(req, res, next) {
  Item.create(req.body, function(err, item) {
    if (err) return next(err);
    res.json(item);
  });
});

/* GET SINGLE ITEM BY ID */
router.get('/:id', function(req, res, next) {
  Item.findById(req.params.id, function(err, item) {
    if (err) return next(err);
    res.json(item);
  });
});

/* UPDATE ITEM */
router.put('/:id', function(req, res, next) {
  Item.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(err, item) {
    if (err) return next(err);
    res.json(item);
  });
});

/* DELETE ITEM */
router.delete('/:id', function(req, res, next) {
  Item.findByIdAndRemove(req.params.id, req.body, function(err, item) {
    if (err) return next(err);
    res.json(item);
  });
});

module.exports = router;
