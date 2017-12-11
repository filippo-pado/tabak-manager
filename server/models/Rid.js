var mongoose = require('mongoose');

var RidSchema = new mongoose.Schema({
  category: String,
  description: String,
  date: Date,
  amount: Number,
  verifiedMovement: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('Rid', RidSchema);
