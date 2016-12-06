const artist = require('./artist-route');
const genre = require('./genre-route');
const songs = require('./song-route');
const playlist = require('./playlist-route');

module.exports = {artistRouter: artist,
                  genreRouter: genre,
                  songRouter: songs,
                  playlistRouter: playlist
                }
