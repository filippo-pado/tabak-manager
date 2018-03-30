var mongoose = require('mongoose');
var sendXML = require('../libs/vat.js');

var VatSchema = new mongoose.Schema({
  date: Date,
  amount: Number,
  sentXML: String,
  responseXML: String,
  responseCode: Number
});

VatSchema.statics.sendVat = function (vat, callback) {
  if (process.env.NODE_ENV === 'dev') {
    return callback('Cant send vats in develop mode!');
  }
  return this.find().sort({
    'date': -1
  }).exec(function (err, vats) {
    if (err) return callback(err);
    sendXML(vat, vats[0], vats.length + 1, function (err, newVat) {
      if (err) return callback(err);
      Vat.create(newVat, callback);
    });
  });
};

var Vat = mongoose.model('Vat', VatSchema);
module.exports = Vat;
