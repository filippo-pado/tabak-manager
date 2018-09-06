var mongoose = require('mongoose');

var ReportSchema = new mongoose.Schema({
  date: Date,
  totalIn: Number,
  totalOut: Number
});

var SlotSchema = new mongoose.Schema({
  position: Number,
  name: String,
  operational: Boolean,
  reports: [ReportSchema]
});

module.exports = mongoose.model('Slot', SlotSchema);
