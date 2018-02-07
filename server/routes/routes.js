var express = require('express'),
  path = require('path'),
  router = express.Router();

var userRoutes = require('./user.routes.js');
var protectRoutes = require('./protect.routes.js');
var logRoutes = require('./log.routes.js');
var infoRoutes = require('./info.routes.js');
var profitRoutes = require('./profit.routes.js');

var restBuilder = require('./restBuilder.js');
var Movement = require('../models/Movement.js');
var Rid = require('../models/Rid.js');
var Category = require('../models/Category.js');
var Log = require('../models/Log.js');

router.use('/api/users/', userRoutes);
router.use('/api', protectRoutes);
router.use('/api', logRoutes);
router.use('/api/info/', infoRoutes);
router.use('/api/profits/', profitRoutes);
router.use('/api/movements/', restBuilder(express.Router(), Movement));
router.use('/api/rids/', restBuilder(express.Router(), Rid, true));
router.use('/api/categories/', restBuilder(express.Router(), Category));
router.use('/api/logs/', restBuilder(express.Router(), Log));

router.get('/api/*', (req, res) => {
  res.status(500).send('Wrong API request');
});

router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
});

module.exports = router;
