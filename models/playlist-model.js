const Sequelize = require('sequelize');
const sequelizeConnection = require('../db');
const Song = require('./song-model');

//////////
// YOUR CODE HERE:
//////////
var Playlist = sequelizeConnection.define('playlist',{
  title: {type: Sequelize.STRING(100)}
});

Song.belongsToMany(Playlist,{through: 'Playlist_Song'});
Playlist.belongsToMany(Song,{through: 'Playlist_Song'});

module.exports = Playlist;
