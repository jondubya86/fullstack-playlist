const Song = require('../models/song-model');
const express = require('express');
const router = express.Router();

var getAllSongs = (req,res)=>{
  Song.findAll()
  .then((songs)=>{
    res.send(songs)
  })
};

var getIndex = (req, res) => {
  res.sendFile(path.join(__dirname, '/front/index.html'));
};

router.route('/')
.get(getAllSongs)

router.route('/*')
.get(getIndex)


module.exports = router
