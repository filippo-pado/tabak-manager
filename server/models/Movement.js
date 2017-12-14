var mongoose = require('mongoose');

var MovementSchema = new mongoose.Schema({
  category: String, // 'Bollo', Super'..
  date: Date,
  gross: Number,
  net: Number,
  profit: Number,
  rid: Number,
  extraRid: Number,
  verifiedRid: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('Movement', MovementSchema);
