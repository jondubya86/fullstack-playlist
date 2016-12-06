const Sequelize = require('sequelize');
const sequelizeConnection = require('../db');

//////////
// YOUR CODE HERE:
//////////
var Genre = sequelizeConnection.define('genre',{
  title: {type: Sequelize.STRING(100),
  validate: {notEmpty: true}}
});

module.exports = Genre;
