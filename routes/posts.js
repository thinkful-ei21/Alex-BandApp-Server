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
  
  const { message, mediaUrl } = req.body;

  /***** Never trust users - validate input *****/
  if (!title) {
    const err = new Error('Missing `message` in request body');
    err.status = 400;
    return next(err);
  }


  const newNote = { title, content, folderId, tags };

  Note.create(newNote)
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

module.exports = router;