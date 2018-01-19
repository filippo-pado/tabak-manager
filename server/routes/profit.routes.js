var express = require('express'),
  path = require('path'),
  router = express.Router();

var Movement = require('../models/Movement.js');

router.get('/', (req, res) => {
  Movement.aggregate([
    {
      $lookup: {
        from: 'categories',
        localField: 'category',
        foreignField: '_id',
        as: 'category'
      },
    },
    { $unwind: '$category' },
    {
      $group: {
        _id: {
          category: req.query.group ? ('$category.' + req.query.group) : '$category.profitGroup',
          month: { $ceil: { $divide: [{ $month: "$date" }, req.query.months ? Number(req.query.months) : 1] } },
        },
        profit: {
          $sum: {
            $divide: [
              { $trunc: { $add: [{ $multiply: [{ $multiply: ['$amount', '$category.amountToProfit'] }, 100] }, 0.5] } }, 100
            ]
          }
        },
        count: { $sum: 1 }
      }
    }, {
      $group: {
        _id: '$_id.month',
        profits: {
          $push: {
            category: "$_id.category",
            profit: "$profit",
          }
        }
      }
    }, {
      $project: {
        profits: {
          $arrayToObject: {
            $map: {
              input: "$profits",
              as: "pair",
              in: ["$$pair.category", "$$pair.profit"]
            }
          }
        }
      }
    },
    { $addFields: { profits: { 'period': "$_id" } } },
    {
      $replaceRoot: { newRoot: "$profits" }
    }
  ]).exec(function (err, profits) {
    res.json(profits);
  });
});

module.exports = router;