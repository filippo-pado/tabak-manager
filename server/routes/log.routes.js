var Log = require('../models/Log.js');

module.exports = function (req, res, next) {
  if (req.method !== 'GET' && (req.originalUrl.indexOf('query') === -1)) {
    var newLog = new Log();
    newLog.requestType = req.method;
    newLog.body = req.body;
    newLog.url = req.originalUrl;
    newLog.date = new Date();
    Log.create(newLog, function (err, data) {
      if (err) return res.status(500).send('Log error. Error: ' + err.message);
      next();
    });
  }
  else {
    next();
  }
};
