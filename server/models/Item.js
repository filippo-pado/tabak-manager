var mongoose = require('mongoose');

var ItemSchema = new mongoose.Schema({
  barcode: { type: String, default: '' },
  price: { type: Number, default: 0 }
});

module.exports = mongoose.model('Item', ItemSchema);
