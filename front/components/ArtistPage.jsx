import React from 'react';
import $ from 'jquery';

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
	render(){
		console.log(this.state.artists)
	return (
		<div>
			<ul>
			{this.state.artists.map((artist,index)=>
				{return (<li key={index}>{artist.name}</li>)}	
			)}
			</ul>
		</div>
		)
	}
});

export default ArtistPage;