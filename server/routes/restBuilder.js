module.exports = function(router, model) {
  var mongoose = require('mongoose');

  /*
    GET /
    POST /

    GET /:id
    PATCH /:id
    DELETE /:id
  */

  /* GET ALL ITEMS */
  router.get('/', function(req, res, next) {
    model.find(req.query, function(err, data) {
      if (err) return next(err);
      res.json(data);
    });
  });

  /* SAVE ITEM */
  router.post('/', function(req, res, next) {
    model.create(req.body, function(err, data) {
      if (err) return next(err);
      res.json(data);
    });
  });

  /* GET SINGLE ITEM BY ID */
  router.get('/:id', function(req, res, next) {
    model.findById(req.params.id, function(err, data) {
      if (err) return next(err);
      res.json(data);
    });
  });

  /* UPDATE ITEM */
  router.patch('/:id', function(req, res, next) {
    model.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(err, data) {
      if (err) return next(err);
      res.json(data);
    });
  });

  /* DELETE ITEM */
  router.delete('/:id', function(req, res, next) {
    model.findByIdAndRemove(req.params.id, req.body, function(err, data) {
      if (err) return next(err);
      res.json(data);
    });
  });

  return router;
}
