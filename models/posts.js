const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  message: { type: String, required: true},
  mediaUrl: String,
  band:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Band' }]
});

// Add `createdAt` and `updatedAt` fields
postSchema.set('timestamps', true);
postSchema.set('toObject', {
  virtuals: true,     // include built-in virtual `id`
  versionKey: false,  // remove `__v` version key
  transform: (doc, ret) => {
    delete ret._id; // delete `_id`
  }
});

module.exports = mongoose.model('Post', postSchema);