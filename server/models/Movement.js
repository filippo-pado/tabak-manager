var mongoose = require('mongoose');

var MovementSchema = new mongoose.Schema({
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  date: Date,
  amount: Number,
  rid: Number,
  extraRid: Number,
  verified: Boolean,
  verifiedRid: { type: mongoose.Schema.Types.ObjectId, ref: 'Rid' },
  note: String
});

module.exports = mongoose.model('Movement', MovementSchema);
