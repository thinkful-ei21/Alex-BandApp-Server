const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true},
  address: {
            streetName: String,
            streetNum: String,
            city: String,
            state: String,
            zipcode: String
           },
  description: String,
  picUrl: String,
  websiteUrl: String
});

// Add `createdAt` and `updatedAt` fields
locationSchema.set('timestamps', true);
locationSchema.set('toObject', {
  virtuals: true,     // include built-in virtual `id`
  versionKey: false,  // remove `__v` version key
  transform: (doc, ret) => {
    delete ret._id; // delete `_id`
  }
});

module.exports = mongoose.model('Location', locationSchema);