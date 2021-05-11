const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const restaurantSchema = mongoose.Schema(
  {
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
    rating: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true }, // So `toObject()` output includes virtuals
  }
);

restaurantSchema.virtual('reviews', {
  ref: 'Review', //The Model to use
  localField: '_id', //Find in Model, where localField
  foreignField: 'restaurant', // is equal to foreignField
  justOne: false,
});

restaurantSchema.plugin(toJSON);
restaurantSchema.plugin(paginate);

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
