var express = require('express'),
  router = express.Router();

var Vat = require('../models/Vat.js');

/* FIND ITEMS */
router.get('/', function (req, res, next) {
  Vat.find({}, 'date amount responseCode', function (err, data) {
    if (err) return next(err);
    res.json(data);
  });
});

/* SAVE ITEM */
router.post('/', function (req, res, next) {
  Vat.sendVat(req.body, function (err, data) {
    if (err) return next(err);
    res.json(data);
  });
});

router.get('/report', (req, res) => {
  Vat.aggregate([{
      $addFields: {
        "year": {
          "$year": "$date"
        },
      }
    }, {
      $match: {
        'year': {
          '$eq': req.query.year ? Number(req.query.year) : (new Date()).getFullYear()
        }
      }
    },
    {
      $group: {
        _id: {
          $month: "$date"
        },
        vats: {
          $sum: {
            $divide: [{
              $trunc: {
                $add: [{
                  $multiply: ['$amount', 100]
                }, 0.5]
              }
            }, 100]
          }
        },
        count: {
          $sum: 1
        }
      }
    }, {
      $sort: {
        _id: 1
      }
    }
  ]).exec(function (err, vats) {
    res.json(vats);
  });
});


/* GET SINGLE ITEM */
router.get('/:id', function (req, res, next) {
  Vat.findById(req.params.id, function (err, data) {
    if (err) return next(err);
    res.json(data);
  });
});

/* GET VATS BY MONTH */

module.exports = router;
