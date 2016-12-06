const Artist =require('../models/artist-model');
const express = require('express');
const router = express.Router();

const getAllArtists = (req,res)=>{
  Artist.findAll()
  .then((data)=>{
    res.send(data)
  })
};

var getIndex = (req, res) => {
  res.sendFile(path.join(__dirname, '/front/index.html'));
};

router.route('/')
.get(getAllArtists)

router.route('/*')
.get(getIndex)

module.exports = router
