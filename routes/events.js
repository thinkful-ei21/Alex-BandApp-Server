'use strict';

const express = require('express');
const mongoose = require('mongoose');

const Event = require('../models/events');
const Location = require('../models/locations')

const passport = require('passport');

const router = express.Router();
const jwtAuth = passport.authenticate('jwt', {session: false, failWithError: true})

/* ========== GET/READ ALL ITEMS ========== */
router.get('/', (req, res, next) => {

  Event.find()
    .populate('location')
    .populate('band')
    .sort({ eventDate: 'asc' })
    .limit(10)
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      next(err);
    });
});

/* ========== GET/READ ALL ITEMS ========== */
router.post('/byBand', (req, res, next) => {
  const bandId = req.body.id
  Event.find({band: bandId})
    .populate('location')
    .populate('band')
    .sort({ eventDate: 'asc' })
    .limit(10)
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      next(err);
    });
});

/* ========== Get Single Event ========== */
router.get('/:id', (req, res, next) => {

  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error('The `id` is not valid');
    err.status = 400;
    return next(err);
  }

  Event.findById(id)
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      next(err);
    });
});

/* ========== Create Post ========== */
router.post('/', jwtAuth, (req, res, next) => {
  const { title, location, description, picUrl, band } = req.body;
  let { eventDate } = req.body;

  /***** Never trust users - validate input *****/
  if (!title) {
    const err = new Error('Missing `message` in request body');
    err.status = 400;
    return next(err);
  }
  eventDate = eventDate.concat(':00.000Z')
  const newEvent = { title, location, description, eventDate, picUrl, band };
  
  Event.create(newEvent)
    .then(result => {
      res
        .location(`${req.originalUrl}/${result.id}`)
        .status(201)
        .json(result);
    })
    .catch(err => {
      next(err);
    });
});

/* ========== PUT/UPDATE A SINGLE ITEM ========== */
router.put('/:id', jwtAuth, (req, res, next) => {
  const { id } = req.params;
  let { title, location, description, eventDate, picUrl } = req.body;

  /***** Never trust users - validate input *****/
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error('The `id` is not valid');
    err.status = 400;
    return next(err);
  }
  eventDate = eventDate.concat(':00.000Z')
  const updateEvent = { title, location, description, eventDate, picUrl };
  
  Event.findByIdAndUpdate(id, updateEvent, { new: true })
    .then(result => {
      if (result) {
        res.json(result);
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });
});

/* ========== Delete Post ========== */
router.delete('/:id', jwtAuth, (req, res, next) => {
  const { id } = req.params;

  /***** Never trust users - validate input *****/
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error('The `id` is not valid');
    err.status = 400;
    return next(err);
  }

  Event.findByIdAndRemove(id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(err => {
      next(err);
    });
});


module.exports = router;