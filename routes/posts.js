'use strict';

const express = require('express');
const mongoose = require('mongoose');

const Post = require('../models/posts');

const passport = require('passport');
const jwtAuth = passport.authenticate('jwt', {session: false, failWithError: true})
const router = express.Router();

/* ========== Get Posts ========== */
router.get('/', (req, res, next) => {
  
  

  Post.find()
    .populate('band')
    .sort({ createdAt: 'desc' })
    .limit(10)
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      next(err);
    });
});

/* ========== Get Posts by Band ========== */
router.post('/byBand', (req, res, next) => {
  const bandId = req.body.id
  Post.find({band: bandId})
    .populate('band')
    .sort({ createdAt: 'desc' })
    .limit(10)
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      next(err);
    });
});

/* ========== Get Single Post ========== */
router.get('/:id', (req, res, next) => {
  
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error('The `id` is not valid');
    err.status = 400;
    return next(err);
  }

  Post.findById(id)
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      next(err);
    });
});

/* ========== Create Post ========== */
router.post('/', jwtAuth, (req, res, next) => {
  
  const { message, mediaUrl, band } = req.body;

  /***** Never trust users - validate input *****/
  if (!message) {
    const err = new Error('Missing `message` in request body');
    err.status = 400;
    return next(err);
  }
  const newPost = { message, mediaUrl, band };

  Post.create(newPost)
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
  const { message, mediaUrl } = req.body;

  /***** Never trust users - validate input *****/
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error('The `id` is not valid');
    err.status = 400;
    return next(err);
  }

  const updatePost = { message, mediaUrl };

  Post.findByIdAndUpdate(id, updatePost, { new: true })
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
router.delete('/:id', jwtAuth,  (req, res, next) => {
  const { id } = req.params;

  /***** Never trust users - validate input *****/
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error('The `id` is not valid');
    err.status = 400;
    return next(err);
  }

  Post.findByIdAndRemove(id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(err => {
      next(err);
    });
});


module.exports = router;