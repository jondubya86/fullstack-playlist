const Playlist = require('../models/playlist-model');
const express = require('express');
const router = express.Router();

// /api/playlist GET all playlists 
const getAllPlaylists = (req,res) => {
  Playlist.findAll()
  .then( playlists => res.send(playlists) )
};

// /api/playlist GET all playlists with song information fully populated (in other words, should say full song, artist, and genre names, instead of only having the ids)
const getPlaylistsFull = (req, res) => {
	Playlist.findAll(
		// { include: [ {all: true} ] } // this will only get Song (based on model def) aka
		{
			include: [
				{ model: Song, include: [ // Song: level 1 association
					{model: Artist}, {model: Genre} // level 2 associations
				]}
			]
		}
	)
	.then( fullPlaylists => res.send(fullPlaylists) )
}

// /api/playlist/:id GET a specific playlist by id
const getPlaylistById = (req, res) => {
	Playlist.findById(req.params.id)
	.then( playlist => res.send(playlist) )
}

// /api/playlist POST (create) a new playlist
// You will also have to use a special 'accessor' method here to add in the songs



// /api/playlist/:id DELETE a playlist by id
const deletePlaylistById = (req, res) => {
	Playlist.destroy(
		{ where: {id: req.params.id} }
	).then( deletedPlaylist => res.send( "deleted playlist: \n" + "id: " + req.params.id + " title: " + deletedPlaylist) )
}


// API ENDPOINTS
router.route("/")
.get(getAllPlaylists)

router.route("/full")
.get(getPlaylistsFull)

router.route("/:id")
.get(getPlaylistById)
.delete(deletePlaylistById)

module.exports = router
