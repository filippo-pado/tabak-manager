var express = require('express'),
  path = require('path'),
  router = express.Router();

var itemRoutes = require('./item.routes.js');
var catalogueRoutes = require('./catalogue.routes.js');

router.use('/api/items/', itemRoutes);
router.use('/api/catalogues/', catalogueRoutes);

router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
});

module.exports = router;
