var express = require('express'),
  path = require('path'),
  router = express.Router();

var itemRoutes = require('./item.routes.js');
var tobaccoItemRoutes = require('./tobacco.item.routes.js');

router.use('/api/items/', itemRoutes);
router.use('/api/tobaccoItems/', tobaccoItemRoutes);

router.get('/api/*', (req, res) => {
  res.status(500).send('Wrong API request');
});

router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
});

module.exports = router;
