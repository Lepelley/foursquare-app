const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  restaurant_id: String,
  name: String,
  address: String,
  postalCode: String,
  city: String,
  state: String,
  country: String,
  type: String
});
restaurantSchema.set('autoIndex', false); // improve performance

// compile restaurant model
module.exports = mongoose.model('Restaurants', restaurantSchema);
