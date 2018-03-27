var express = require('express'),
  router = express.Router();

var Vat = require('../models/Vat.js');

/* FIND ITEMS */
router.get('/', function (req, res, next) {
  Vat.find({}, function (err, data) {
    if (err) return next(err);
    res.json(data);
  });
});

/* SAVE ITEM */
router.post('/', function (req, res, next) {
  Vat.create(req.body, function (err, data) {
    if (err) return next(err);
    res.json(data);
  });
});

/* GET SINGLE ITEM */
router.get('/:id', function (req, res, next) {
  Vat.findById(req.params.id, function (err, data) {
    if (err) return next(err);
    res.json(data);
  });
});
module.exports = router;
