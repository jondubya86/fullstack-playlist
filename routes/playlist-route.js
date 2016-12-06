const Playlist = require('../models/playlist-model');
const express = require('express');
const router = express.Router();

var loadPlaylist = (req,res)=>{
  Playlist.findAll()
  .then((playlists)=>{
    res.send(playlists)
  })
};

var getIndex = (req, res) => {
  res.sendFile(path.join(__dirname, '/front/index.html'));
};

router.route('/')
.get(loadPlaylist)

router.route('/*')
.get(getIndex)

module.exports = router
