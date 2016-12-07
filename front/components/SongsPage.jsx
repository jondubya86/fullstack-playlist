import React, {Component} from 'react';
import $ from 'jquery';
import Player from './Player.jsx'

	// const chooseSong((song)=>{
	// 	console.log(song)
	// 	})
const SongsPage = React.createClass({
	getInitialState(){
		return {songs:[],currentsongtitle:'', currentsongurl:''}
	},
	componentDidMount(){
		$.ajax({
			url: '/api/song',
			type: 'GET',
		}).done((data)=>{
			this.setState({songs:data})
		})
	},
	pickSong(song){
		this.setState({currentsongtitle:song.title})
		this.setState({currentsongurl:song.youtube_url})
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
			<h1>{this.state.currentsongtitle}</h1>
			<Player youtube={this.state.currentsongurl}/>
		</div>
		)
	}
});

export default SongsPage;