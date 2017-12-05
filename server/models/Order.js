var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderSchema = new mongoose.Schema({
  sector: String,
  orders: [{
    date: Date,
    status: { type: String, enum: ['WORKING', 'SENT', 'RECEIVED'] },
    items: [{
      item: { type: Schema.Types.ObjectId, ref: 'Item' },
      ordered: Number,
      received: Number
    }]
  }]
});

module.exports = mongoose.model('Order', OrderSchema);
