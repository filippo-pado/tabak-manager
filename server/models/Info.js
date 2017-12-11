var mongoose = require('mongoose');

var InfoSchema = new mongoose.Schema({
  category: String,
  rate: Number
});

module.exports = mongoose.model('Info', InfoSchema);
