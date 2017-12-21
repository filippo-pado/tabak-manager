var mongoose = require('mongoose');

var MovementSchema = new mongoose.Schema({
  category: String,
  date: Date,
  amount: Number,
  rid: Number,
  extraRid: Number,
  verified: Boolean,
  verifiedRid: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('Movement', MovementSchema);
