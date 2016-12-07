const express = require('express');
const app = express();
const path = require('path');
const Sequelize = require('sequelize');
const sequelizeConnection = require('./db');

const bodyParser = require('body-parser');
//key var starter to link to index.js in routes
const router = require('./routes');

const artistRouter = router.artistRouter;
const genreRouter = router.genreRouter;
const songRouter = router.songRouter;
const playlistRouter = router.playlistRouter;
////////
app.use(express.static(path.join(__dirname, './front/bundle')));

	app.use(bodyParser.urlencoded({ extended: true }));
  	app.use('/api/artist', artistRouter);
  	app.use('/api/genre', genreRouter);
	app.use('/api/song', songRouter);
  	app.use('/api/playlist', playlistRouter);
  	app.get('/*', (req, res) => {
  	res.sendFile(path.join(__dirname, '/front/index.html'))});
  	app.listen('9955', () => console.log('Listening on port 9955'));
//body-parser middleware adds .body property to req (if we make a POST AJAX request with some data attached, that data will be accessible as req.body)


module.exports = router;
////////

//body-parser middleware adds .body property to req (if we make a POST AJAX request with some data attached, that data will be accessible as req.body)
// app.use(bodyParser.urlencoded({ extended: true }));

//listen on port 8888

// app.get('/api/songs',(req,res)=>{
//   Song.findAll({
//   include: [Artist]
//   })
//     .then((data)=>{
//     res.send(data)
//   })
// });


//////////
// YOUR CODE HERE:
//////////
