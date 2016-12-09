import React from 'react';
import {Link, Router} from 'react-router';
import $ from 'jquery';

const SingleArtist = React.createClass({
	getInitialState(){
		return {songs:[]}
	},
	componentDidMount(){
		$.ajax({
			url: '/api/song/'+this.props.params.id,
			type: 'GET'
		}).done(song=>{
			console.log(song)
			this.setState({songs:song})
		})
	},
	render(){
	console.log(this.state.songs)
	return (
		<ul>{this.state.songs.map((song,index)=>{
				return (<li key={index}>{song.title}</li>)
		})}
		</ul>

		)
	}
});

export default SingleArtist;
