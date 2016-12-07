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
					// console.log(data[0].name)
					this.setState({artists:data})
				})
	},
	render(){
	return (
		<div>
			<ul>
			{this.state.artists.map((artist,index)=>
				{
				return (<li key={index}>{artist.name}</li>)
				})	
			}
			</ul>
		</div>
		)
	}
});

export default ArtistPage;