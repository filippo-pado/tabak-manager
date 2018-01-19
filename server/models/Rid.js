var mongoose = require('mongoose');

var RidSchema = new mongoose.Schema({
  category: String,
  description: String,
  date: Date,
  amount: Number,
  verified: Boolean,
  verifiedMovement: { type: mongoose.Schema.Types.ObjectId, ref: 'Movement' }
});

module.exports = mongoose.model('Rid', RidSchema);
