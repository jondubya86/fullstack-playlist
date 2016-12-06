const Genre = require('../models/genre-model');
const express = require('express');
const router = express.Router();

const getGenres = (req,res)=>{
  Genre.findAll().
  then((data)=>{
    res.send(data)
  })
};

const getIndex = (req, res) => {
  res.sendFile(path.join(__dirname, '/front/index.html'));
};

router.route('/')
.get(getGenres)

router.route('/*')
.get(getIndex)

module.exports = router
