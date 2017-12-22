var mongoose = require('mongoose');

var CategorySchema = new mongoose.Schema({
  name: String,
  group: String,
  rate: Number,
  amountToProfit: Number
});

module.exports = mongoose.model('Category', CategorySchema);
