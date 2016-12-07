const Artist =require('../models/artist-model');
const express = require('express');
const router = express.Router();

const getAllArtists = (req,res)=>{
  Artist.findAll()
  .then((data)=>{
    res.send(data)
  })
};

const getArtistById = (req,res)=>{
  Artist.findById(req.params.id)
  .then((data)=>{
    res.send(data)
  })
};

const delArtistById = (req,res)=>{
  Artist.findById(req.params.id)
  .then((data)=>{
    res.send(data)
  })
};
const postNewArtist = (req,res)=>{
  Artist.findOrCreate({
    where: {name: req.body.artist}
  }).then((artist)=>{
    res.send(artist, console.log('artist was created'))
  })
};

const editNewArtist = (req,res)=>{
  Artist.update(
  { name: req.params.name },
  { where: { id: req.params.id }
  }).then((data)=>{
    res.send('Artist '+req.params.name +' ('+req.params.id+')'+' has been updated!')
  })
};

router.route('/')
.get(getAllArtists)
.post(postNewArtist)

router.route('/:id')
.get(getArtistById)
.delete(delArtistById)

router.route('/:id/:name')
.put(editNewArtist)

module.exports = router