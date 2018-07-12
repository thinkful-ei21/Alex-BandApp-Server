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
        // console.log(results)
      res.json(results);
    })
    .catch(err => {
      next(err);
    });
});
/* ========== Get single location ========== */
router.get('/:id', (req, res, next) => {

    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const err = new Error('The `id` is not valid');
      err.status = 400;
      return next(err);
    }
  
    Location.findById(id)
      .then(results => {
        console.log(results)
        res.json(results);
      })
      .catch(err => {
        next(err);
      });
  });

module.exports = router;