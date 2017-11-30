var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CatalogueSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  items: [{ type: Schema.Types.ObjectId, ref: 'Item' }]
});

module.exports = mongoose.model('Catalogue', CatalogueSchema);
