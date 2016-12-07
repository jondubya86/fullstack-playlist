import React from 'react';
import $ from 'jquery';

const Playlist = React.createClass({
	getInitialState(){
		return {playlist:[]}
	},
	componentDidMount(){
		$.ajax({
			url: '/api/playlist',
			type: 'GET'
		}).done((data)=>this.setState({playlist:data}))
	},
	render(){
		console.log(this.state.playlist)
		return (
			<div>
				<ul>
					{this.state.playlist.map((playlist,index)=>{
						return <li key={index}>{playlist.title}</li>
						})
					}
				</ul>
			</div>
			)
	}
})

export default Playlist;