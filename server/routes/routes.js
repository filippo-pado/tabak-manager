var express = require('express'),
  path = require('path'),
  router = express.Router();

var restBuilder = require('./restBuilder.js');
var infoRoutes = require('./info.routes.js');
var Movement = require('../models/Movement.js');
var Rid = require('../models/Rid.js');

router.use('/api/info/', infoRoutes);
router.use('/api/movements/', restBuilder(express.Router(), Movement));
router.use('/api/rids/', restBuilder(express.Router(), Rid));

router.get('/api/*', (req, res) => {
  res.status(500).send('Wrong API request');
});

router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
});

module.exports = router;
