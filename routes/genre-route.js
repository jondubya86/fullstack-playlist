const Genre = require('../models/genre-model');
const express = require('express');
const router = express.Router();


const getAllGenres = (req,res)=>{
  Genre.findAll().
  then( data => res.send(data) )
};

// /api/genre/sortedAZ GET all genres, ordered a-z
const getGenresAZ = (req, res) => {
	Genre.findAll(
		{ order: [ "title" ] } // there's no ", 'ASC' "
	).then( sortedGenres => res.send(sortedGenres) )
}

// /api/genre/:id GET a specific genre by id
const getGenreById = (req, res) => {
	Genre.findById(req.params.id)
	.then( genre => res.send(genre) )
}

// /api/genre POST (create) a new genre



// /api/genre/:id/:newGenre PUT (update) a specific genre's name
const putGenreByTitle = (req, res) => {
	Genre.update(
		{ title : req.body.title },
		{ where: {id: req.params.id} }
	)
	.then( updatedGenre => res.send("Song ID: " + req.params.id + " title's replaced with " + req.params.newGenre
		)
	)
}



// API ENDPOINTS
router.route('/')
.get(getAllGenres)

router.route("/sortedAZ")
.get(getGenresAZ)

router.route("/:id")
.get(getGenreById)

router.route("/:id/:newGenre")
.put(putGenreByTitle)

module.exports = router
