var mongoose = require('mongoose');

var VatSchema = new mongoose.Schema({
  date: Date,
  amount: Number
});

module.exports = mongoose.model('Vat', VatSchema);
