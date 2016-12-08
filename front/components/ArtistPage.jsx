import React from 'react';
import $ from 'jquery';
import {Link} from 'react-router'
import SingleArtist from './SingleArtist.jsx'

const ArtistPage = React.createClass({
	getInitialState(){ 
		return {artists:[]}
	},
	componentDidMount(){
		$.ajax({
			url: '/api/artist',
			type: 'GET'
		})
		.done((data)=>{
			this.setState({artists:data})
		})
	},
	// artistSongs(songs){
	// 	$.ajax({
	// 		url: 
	// 	})
	// }
	render(){
		console.log(this.state.artists)
	return (
		<div>
			<ul>
			{this.state.artists.map((artist,index)=>
				{return (<Link to={`/artists/${artist.id}`} key={index}>
							<li key={index}>{artist.name}</li>
						</Link>)}	
			)}
			</ul>
		</div>
		)
	}
});

export default ArtistPage;