const Song = require('../models/song-model');
const express = require('express');
const router = express.Router();
const Artist = require('../models/artist-model')
const Genre = require('../models/genre-model')

const getAllSongs = (req,res)=>{
  Song.findAll()
  .then((songs)=>{
    res.send(songs)
  })
};

const getSongById = (req,res)=>{
  Song.findById(req.params.id)
  .then((data)=>{
    res.send(data)
  })
};

const postNewSong = (req,res)=>{
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

const updateSong = (req,res)=>{
  Song.update(
  { title: req.params.title },
  { where: { id: req.params.id}
  }).then((data)=>{
    res.send('Song '+req.params.title +' ('+req.params.id+')'+' has been updated!')
  })
};

const deleteSongById = (req,res)=>{
  Song.destroy({
    where: {id: req.params.id}}
  ).then(()=>{
    res.send('song has been deleted')
  })
};

router.route('/')
.get(getAllSongs)
.post(postNewSong)

router.route('/:id')
.get(getSongById)
.delete(deleteSongById)

router.route('/:id/:title')
.put(updateSong)


module.exports = router
