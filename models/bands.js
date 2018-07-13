const mongoose = require('mongoose');

const bandSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true},
  bandUrl: { type: String, required: true, unique: true},
  bannerUrl: String
});

// Add `createdAt` and `updatedAt` fields
bandSchema.set('timestamps', true);
bandSchema.set('toObject', {
  virtuals: true,     // include built-in virtual `id`
  versionKey: false,  // remove `__v` version key
  transform: (doc, ret) => {
    delete ret._id; // delete `_id`
  }
});

module.exports = mongoose.model('Band', bandSchema);