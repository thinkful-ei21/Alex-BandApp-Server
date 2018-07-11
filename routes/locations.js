'use strict';

const express = require('express');
const mongoose = require('mongoose');

const Location = require('../models/locations');

const router = express.Router();

/* ========== Get Bands ========== */
router.post('/search/:term', (req, res, next) => {
  
  const { term } = req.params;

  Location.find({ "name": { "$regex": term, "$options": "i" }})
    .sort({ createdAt: 'desc' })
    .then(results => {
        console.log(results)
      res.json(results);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;