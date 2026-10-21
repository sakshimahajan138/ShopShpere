const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, default: 'General' },
  rating: { type: Number, default: 4.0 },
  description: { type: String, default: '' }
});

module.exports = mongoose.model('Product', productSchema);