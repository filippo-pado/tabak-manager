var mongoose = require('mongoose');

var LogSchema = new mongoose.Schema({
  requestType: String, //POST, PATCH, DELETE..
  body: Object,
  url: String,
  date: Date
});

module.exports = mongoose.model('Log', LogSchema);
