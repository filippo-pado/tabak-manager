var express = require('express'),
  router = express.Router();

var Slot = require('../models/Slot.js');

router.get('/:id/reports', function (req, res, next) {
  Slot.findById(req.params.id, function (err, slot) {
    if (err) return next(err);
    res.json(slot.reports);
  });
});

router.post('/:id/reports', function (req, res, next) {
  Slot.findOneAndUpdate({
      "_id": req.params.id
    }, {
      "$push": {
        "reports": req.body
      }
    },
    function (err, data) {
      if (err) return next(err);
      res.json(data);
    }
  );
});
router.patch('/:id/reports/:report_id', function (req, res, next) {
  Slot.findOneAndUpdate({
      "_id": req.params.id,
      "reports._id": req.params.report_id
    }, {
      "$set": {
        "reports.$": req.body
      }
    },
    function (err, data) {
      if (err) return next(err);
      res.json(data);
    }
  );
});

router.delete('/:id/reports/:report_id', function (req, res, next) {
  Slot.findOneAndUpdate({
      "_id": req.params.id
    }, {
      "$pull": {
        "reports": {
          "_id": req.params.report_id
        }
      }
    },
    function (err, data) {
      if (err) return next(err);
      res.json(data);
    }
  );
});
router.get('/reportsByDate', (req, res, next) => {
  Slot.aggregate([{
      $unwind: '$reports'
    },
    {
      $addFields: {
        'reports.slot': "$_id",
        'reports.yearMonthDay': {
          $dateToString: {
            format: "%Y-%m-%d",
            date: "$reports.date"
          }
        },
      }
    },
    {
      $group: {
        _id: '$reports.yearMonthDay',
        reports: {
          $push: '$reports'
        },
        count: {
          $sum: 1
        }
      }
    },
    {
      $sort: {
        "_id": 1
      }
    }
  ]).exec(function (err, vats) {
    if (err) return next(err);
    res.json(vats);
  });
});

module.exports = router;
