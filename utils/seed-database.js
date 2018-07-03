'use strict';

const mongoose = require('mongoose');

const { MONGODB_URI } = require('../config');

const Post = require('../models/posts');
const Location = require('../models/locations');
const Event = require('../models/events');

const seedPosts = require('../db/seed/posts');
const seedLocations = require('../db/seed/locations');
const seedEvents = require('../db/seed/events');

console.log(`Connecting to mongodb at ${MONGODB_URI}`);
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.info('Dropping Database');
    return mongoose.connection.db.dropDatabase();
  })
  .then(() => {
    console.info('Seeding Database');
    return Promise.all([

      Post.insertMany(seedPosts),

      Location.insertMany(seedLocations),
      Location.createIndexes(),

      Event.insertMany(seedEvents)
    ]);
  })
  .then(() => {
    console.info('Disconnecting');
    return mongoose.disconnect();
  })
  .catch(err => {
    console.error(err);
    return mongoose.disconnect();
  });