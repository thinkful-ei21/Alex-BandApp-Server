'use strict';

const express = require('express');
const mongoose = require('mongoose');

const Post = require('../models/posts');

const router = express.Router();

/* ========== Get Posts ========== */
router.get('/', (req, res, next) => {
  
  Post.find()
    //.populate('tags')
    .sort({ createdAt: 'desc' })
    .limit(10)
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      next(err);
    });
});

/* ========== Create Post ========== */
router.post('/', (req, res, next) => {

  console.log(req.body)
  
  const { message, mediaUrl } = req.body;

  /***** Never trust users - validate input *****/
  if (!message) {
    const err = new Error('Missing `message` in request body');
    err.status = 400;
    return next(err);
  }


  const newPost = { message, mediaUrl };

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

/* ========== Create Post ========== */
router.delete('/:id', (req, res, next) => {
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