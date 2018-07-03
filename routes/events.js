'use strict';

const express = require('express');
const mongoose = require('mongoose');

const Event = require('../models/events');
const Location = require('../models/locations')

const router = express.Router();

/* ========== GET/READ ALL ITEMS ========== */
router.get('/', (req, res, next) => {
  
  Event.find()
    .populate('location')
    .sort({ updatedAt: 'desc' })
    .limit(10)
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;