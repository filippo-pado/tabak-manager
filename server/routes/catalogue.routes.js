var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Catalogue = require('../models/Catalogue.js');

/*
  GET /
  POST /

  GET /:id
  PUT /:id
  DELETE /:id

  GET /:id/items
  POST /:id/items
  DELETE /:id/items/:id

*/

/* GET ALL CATALOGUES */
router.get('/', function(req, res, next) {
  Catalogue.find(function(err, catalogues) {
    if (err) return next(err);
    res.json(catalogues);
  });
});

/* POST CATALOGUE */
router.post('/', function(req, res, next) {
  Catalogue.create(req.body, function(err, catalogue) {
    if (err) return next(err);
    res.json(catalogue);
  });
});

/* GET SINGLE CATALOGUE BY ID */
router.get('/:id', function(req, res, next) {
  Catalogue.findById(req.params.id, function(err, catalogue) {
    if (err) return next(err);
    res.json(catalogue);
  });
});

/* UPDATE CATALOGUE */
router.put('/:id', function(req, res, next) {
  Catalogue.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(err, catalogue) {
    if (err) return next(err);
    res.json(catalogue);
  });
});

/* DELETE CATALOGUE */
router.delete('/:id', function(req, res, next) {
  Catalogue.findByIdAndRemove(req.params.id, req.body, function(err, catalogue) {
    if (err) return next(err);
    res.json(catalogue);
  });
});

/* GET ALL ITEMS OF A CATALOGUE */
router.get('/:id/items', function(req, res, next) {
  Catalogue.findById(req.params.id, function(err, catalogue) {
    if (err) return next(err);
    if (catalogue) res.json(catalogue.items);
    else next();
  });
});

/* POST ITEM IN CATALOGUE */
router.post('/:id/items', function(req, res, next) {
  Catalogue.findByIdAndUpdate(req.params.id, { $addToSet: { items: req.body._id } }, { new: true }, function(err, catalogue) {
    if (err) return next(err);
    res.json(catalogue);
  });
});

/* DELETE ITEM IN CATALOGUE */
router.delete('/:id/items/:item_id', function(req, res, next) {
  Catalogue.findByIdAndUpdate(req.params.id, { $pull: { items: req.params.item_id } }, { new: true }, function(err, catalogue) {
    if (err) return next(err);
    res.json(catalogue);
  });
});

module.exports = router;
