var mongoose = require('mongoose');
var Item = require('./Item.js');

var TobaccoItemSchema = new mongoose.Schema({
  /* INHERITED
  barcode: String,
  name: String,
  price: Number
  */
  aams: Number,
  category: String,
  packType: String,
  pricekg: Number,
  pricePack: Number,
  cartonWeight: Number
});

module.exports = Item.discriminator('TobaccoItem', TobaccoItemSchema);
