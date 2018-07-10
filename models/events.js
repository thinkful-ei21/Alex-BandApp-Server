const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true},
  description: String,
  location:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Location' }],
  picUrl: String,
  eventDate: {type: Date, required: true},
  band:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Band' }]
});

// Add `createdAt` and `updatedAt` fields
eventSchema.set('timestamps', true);
eventSchema.set('toObject', {
  virtuals: true,     // include built-in virtual `id`
  versionKey: false,  // remove `__v` version key
  transform: (doc, ret) => {
    delete ret._id; // delete `_id`
  }
});

module.exports = mongoose.model('Event', eventSchema);