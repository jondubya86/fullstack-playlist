import React from 'react';
import {Link, Router} from 'react-router';
import $ from 'jquery';

const SingleArtist = React.createClass({
	getInitialState(){
		return {songs:[]}
	},
	componentDidMount(){

	},
	render(){

	// $.ajax({
	// 	url: '/api/songs/'+props.
	// })
	return (
		<h1>{props.params.id}</h1>
		)
	}
});

export default SingleArtist;