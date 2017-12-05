var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WarehouseSchema = new mongoose.Schema({
  sector: String,
  items: [{
    item: { type: Schema.Types.ObjectId, ref: 'Item' },
    target: Number,
    average: Number,
    available: [{
      location: String,
      quantity: Number
    }]
  }]
});

module.exports = mongoose.model('Warehouse', WarehouseSchema);
