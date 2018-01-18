var mongoose = require('mongoose');

var CategorySchema = new mongoose.Schema({
  name: String,
  group: String,
  profitGroup: String,
  art: String,
  rate: Number,
  amountToProfit: Number
});

module.exports = mongoose.model('Category', CategorySchema);
