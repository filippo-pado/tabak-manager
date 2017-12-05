var mongoose = require('mongoose');

var ItemSchema = new mongoose.Schema({
  sector: String,
  barcode: String,
  name: String,
  price: { type: Number, default: 0 }
});

module.exports = mongoose.model('Item', ItemSchema);
