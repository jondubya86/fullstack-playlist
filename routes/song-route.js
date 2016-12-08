const Artist = require("../models/artist-model")
const Genre = require("../models/genre-model")
const Song = require('../models/song-model');
const Playlist = require('../models/playlist-model');
const express = require('express');
const router = express.Router();

// /api/song GET all songs
const getAllSongs = (req,res)=>{
  Song.findAll()
  // 1 res.send ONLY 
  .then( songs => res.send(songs) )
};

// /api/song/full GET all songs with genre and artist information fully populated (in other words, should say full artist name and genre names, instead of only having the ids)
const getAllSongsInfo = (req, res) => {
  Song.findAll({
    // include: [{ all: true }] // includes all joins
    include: [ Artist, Genre ]
  })
  .then( fullSongs => res.send(fullSongs) )
}

// /api/songs/:id GET specific song by id
const getSongById = (req, res) => {
  Song.findById(// WRONG: {where: {id: req.params.id} }
    req.params.id
  ).then( song => res.send(song) )
}

// /api/songs POST (create) a new song
const postSong = (req,res)=>{
  var body = req.body;
  Artist.findOrCreate({
    where: {name: body.name}
  })
  .then(artistInfo=>
    Song.create({
      title: body.title,
      youtube_url: body.youtube_url,
      artistId: artistInfo[0].dataValues.id
    })
    .then(songInfo=>{
      Genre.findOrCreate({
        where: {title: body.genre}
      })
      .then(genreInfo=>
        songInfo.addGenres([genreInfo[0].dataValues.id])
      )
    })
  )
  .then(()=>
    res.send('Song with name: '+body.title+', artist: '+body.name+', genre: '+body.genre+', youtube_url: '+body.youtube_url+' created!')
  )
};

// /api/songs/:id/:newTitle PUT (update) a specific song's title
const putSongByTitle = (req, res) => {
  Song.update(
    {title: req.params.newTitle}, // set attributes' value
    {where: {id: req.params.id}  } // where criteria
  )
  .then( updatedSong => res.send("Song ID: " + req.params.id + " title's replaced with " + req.params.newTitle
    )
  )
}

// const putSongByTitle = (req, res) => {
//  Song.findById( req.params.id )
//  .then( song => song.update( 
//      {title: req.params.newTitle}
//    )
//  )
//  .then( updatedSong => res.send("Song ID: " + req.params.id + " title's replaced with " + req.params.newTitle
//    )
//  )
// }

// /api/songs/:id DELETE a specific song by id
const deleteSongById = (req, res) => {
  Song.destroy(
    { where: { id: req.params.id } }
  )
  .then( deletedSong => res.send( "deleted song: \n" + "id: " + req.params.id + "  title: " + deletedSong.title ) ) // deletedSong.title = undefined as it was not sent to the req.body
}

// API ENDPOINTS
router.route('/')
.get(getAllSongs)
.post(postSong)

router.route("/full")
.get(getAllSongsInfo)

router.route("/:id")
.get(getSongById)
.delete(deleteSongById)

router.route("/:id/:newTitle")
.put(putSongByTitle)

module.exports = router
