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
  
  Artist.findOrCreate({ // returns array of objects
    where: {name: body.name} // 1st Body field in postman
  })
  .then( artistInfo => { 
      // console.log("artistInfo:", artistInfo, "\n artistId:", artistInfo[0].dataValues.id);
      // res.send(artistInfo)
      Song.create({ // creates an object, not array of objects
        title: body.title,  // 2nd Body field in postman
        youtube_url: body.youtube_url, // 3rd Body field in postman
        artistId: artistInfo[0].dataValues.id
      })
      .then( songInfo => {
        // console.log("songInfo:", songInfo);
        Genre.findOrCreate({
          where: {title: body.genre}
        }) // nested inside songInfo promise 
        .then( genreInfo => {
          // console.log(genreInfo);
          songInfo.addGenres([genreInfo[0].dataValues.id]) // connecting song object to genre ID
        })
        .then( () =>
          // console.log(songInfo)
          res.send('New song added.\n ID: ' + songInfo.dataValues.id
            + '\nTitle: ' + body.title
            + '\n Artist: ' + body.name
            + '\n Genre: ' + body.genre 
            + '\n youtube_url: ' + body.youtube_url)
        )
      })
    } 
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
