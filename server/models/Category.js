var mongoose = require('mongoose');

var CategorySchema = new mongoose.Schema({
  name: String,
  pattern: String,
  group: String,
  profitGroup: String,
  art: String,
  rate: Number,
  amountToProfit: Number
});

module.exports = mongoose.model('Category', CategorySchema);
