var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WarehouseSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  locations: [{
    name: { type: String, default: 'main' },
    items: [{
      item: { type: Schema.Types.ObjectId, ref: 'Item' },
      available: { type: Number, default: 0 }
    }]
  }]
});

module.exports = mongoose.model('Warehouse', WarehouseSchema);
