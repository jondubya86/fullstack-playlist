import React from 'react';
import {Link, Router} from 'react-router';
import $ from 'jquery';

const SingleArtist = React.createClass({
	getInitialState(){
		return {songs:[]}
	},
	componentDidMount(){
		$.ajax({
			url: '/api/songs/'+this.params.id,
			type: 'GET'
		}).done((song)=>{
			console.log(song.title)
			this.setState({songs:song})
		})
	},
	render(){
	console.log(this.state.songs.title)
	return (
		<ul>{this.state.songs.map((song,index)=>{
				return (<li key={index}>{song.title}</li>)
		})}
		</ul>

		)
	}
});

export default SingleArtist;
