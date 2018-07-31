var express = require('express'),
  path = require('path'),
  router = express.Router();

var Movement = require('../models/Movement.js');

router.get('/', (req, res) => {
  Movement.aggregate([{
      $project: {
        year: {
          $year: '$date'
        },
        category: 1,
        date: 1,
        amount: 1
      }
    },
    {
      $match: {
        year: Number(req.query.year)
      }
    }, {
      $lookup: {
        from: 'categories',
        localField: 'category',
        foreignField: '_id',
        as: 'category'
      },
    },
    {
      $unwind: '$category'
    },
    {
      $match: {
        'category.art': {
          '$ne': ''
        }
      }
    },
    {
      $group: {
        _id: {
          group: req.query.group ? ('$category.' + req.query.group) : '$category.profitGroup',
          month: {
            $substr: [{
              $ceil: {
                $divide: [{
                  $month: "$date"
                }, req.query.months ? Number(req.query.months) : 1]
              }
            }, 0, -1]
          },
        },
        profit: {
          $sum: {
            $divide: [{
              $trunc: {
                $add: [{
                  $multiply: [{
                    $multiply: ['$amount', '$category.amountToProfit']
                  }, 100]
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
      $group: {
        _id: '$_id.group',
        profits: {
          $push: {
            month: "$_id.month",
            profit: "$profit",
          }
        },
        totalGroup: {
          $sum: "$profit",
        }
      }
    }, {
      $project: {
        profits: {
          $arrayToObject: {
            $map: {
              input: "$profits",
              as: "pair",
              in: ["$$pair.month", "$$pair.profit"]
            }
          }
        },
        totalGroup: 1
      }
    },
    {
      $addFields: {
        profits: {
          'group': "$_id",
          'totalGroup': '$totalGroup'
        }
      }
    },
    {
      $replaceRoot: {
        newRoot: "$profits"
      }
    }
  ]).exec(function (err, profits) {
    res.json(profits);
  });
});

module.exports = router;
