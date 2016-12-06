const Sequelize = require('sequelize');
const sequelizeConnection = require('../db');
const Artist = require('./artist-model');
const Genre = require('./genre-model');

//////////
// YOUR CODE HERE:
//////////
var Song = sequelizeConnection.define('song',{
  title: {type: Sequelize.STRING(250)},
  youtube_url: {type: Sequelize.STRING(50),
        validate: {isUrl: true ,
                  is: /^[a-z A-Z 0-9 : / ? = .]$/}}
});

Song.belongsTo(Artist);
Song.belongsToMany(Genre, {through: 'Song_genre'});
Genre.belongsToMany(Song, {through: 'Song_genre'});

module.exports = Song;
