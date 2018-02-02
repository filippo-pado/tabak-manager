module.exports = function (router, model, enableDeleteAll = false) {
  var mongoose = require('mongoose');

  /*
    GET /
    POST /
    DELETE /

    POST /query

    GET /:id
    PATCH /:id
    DELETE /:id
  */

  /* GET ALL ITEMS */
  router.get('/', function (req, res, next) {
    model.find({}, function (err, data) {
      if (err) return next(err);
      res.json(data);
    });
  });

  /* SAVE ITEM */
  router.post('/', function (req, res, next) {
    model.create(req.body, function (err, data) {
      if (err) return next(err);
      res.json(data);
    });
  });

  /* DELETE ALL*/
  if (enableDeleteAll) {
    router.delete('/', function (req, res, next) {
      model.remove({}, function (err, data) {
        if (err) return next(err);
        res.json(data);
      });
    });
  }

  /*SAVE MANY ITEMS*/
  router.post('/bulk', function (req, res, next) {
    model.insertMany(req.body, function (err, data) {
      if (err) return next(err);
      res.json(data);
    });
  });

  /* QUERY ITEMS */
  router.post('/query', function (req, res, next) {
    model.find(req.body.query ? req.body.query : {}).populate(req.body.populate ? req.body.populate : '').exec(function (err, data) {
      if (err) return next(err);
      res.json(data);
    });
  });

  /* GET SINGLE ITEM BY ID */
  router.get('/:id', function (req, res, next) {
    model.findById(req.params.id, function (err, data) {
      if (err) return next(err);
      res.json(data);
    });
  });

  /* UPDATE ITEM */
  router.patch('/:id', function (req, res, next) {
    model.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (err, data) {
      if (err) return next(err);
      res.json(data);
    });
  });

  /* DELETE ITEM */
  router.delete('/:id', function (req, res, next) {
    model.findByIdAndRemove(req.params.id, req.body, function (err, data) {
      if (err) return next(err);
      res.json(data);
    });
  });

  return router;
}
