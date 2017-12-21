var mongoose = require('mongoose');

var InfoSchema = new mongoose.Schema({
  categories: [{
    _id: false,
    category: String,
    rate: Number,
    amountToProfit: Number
  }]
});

module.exports = mongoose.model('Info', InfoSchema);
