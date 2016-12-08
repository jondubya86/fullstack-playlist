import React, {Component} from 'react';
import $ from 'jquery';
import Player from './Player.jsx'

	// const chooseSong((song)=>{
	// 	console.log(song)
	// 	})
const SongsPage = React.createClass({
	getInitialState(){
		return {songs:[],
				artist:'',
				currentsongtitle:'Rick Astley - Never Gonna Give You Up', 
				currentsongurl:'https://www.youtube.com/watch?v=dQw4w9WgXcQ'}
	},
	componentDidMount(){
		$.ajax({
			url: '/api/song',
			type: 'GET',
		}).done((data)=>{
			console.log(data)
			this.setState({songs:data})
		})
	},
	pickSong(song){
		this.setState({currentsongtitle:song.title})
		this.setState({currentsongurl:song.youtube_url})
		this.setState({artist:song.artistId})
		$.ajax({
			url: '/api/artist/'+song.artistId,
			type: 'GET',
		}).done((artist)=>{
			this.setState({artist:artist.name})
		})
	},
	render(){
		return (
			<div>
			<ul>
			{this.state.songs.map((song,index)=>
				{
				return (<li onClick={this.pickSong.bind(this,song)} key={index}>{song.title}</li>)
				}	
			)}
			</ul>
			<h1>{this.state.artist} - {this.state.currentsongtitle}</h1>
			<Player youtube={this.state.currentsongurl}/>
		</div>
		)
	}
});

export default SongsPage;