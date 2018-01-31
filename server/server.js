require('dotenv').config()

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');

var routes = require('./routes/routes.js');
var app = express();

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect(process.env.MONGODB_URI, { promiseLibrary: require('bluebird') })
  .catch((err) => console.error(err));

if (process.env.NODE_ENV === 'dev') {
  var logger = require('morgan');
  app.use(logger('dev'));
}
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ 'extended': 'false' }));
app.use(express.static(path.join(__dirname, '../dist')));
app.use('/', routes);

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('Internal server error. ' + (process.env.NODE_ENV === 'dev' ? err : ''));
});

module.exports = app;
