var mongoose = require('mongoose');

var RidSchema = new mongoose.Schema({
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  description: String,
  date: Date,
  amount: Number,
  verified: Boolean,
  verifiedMovement: String
});

module.exports = mongoose.model('Rid', RidSchema);
