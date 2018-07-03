'use strict';

const express = require('express');
const mongoose = require('mongoose');

const Post = require('../models/posts');

const router = express.Router();

/* ========== GET/READ ALL ITEMS ========== */
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

module.exports = router;