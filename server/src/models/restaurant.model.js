const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const restaurantSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});
restaurantSchema.plugin(toJSON);
restaurantSchema.plugin(paginate);

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
