import React from 'React'
import {Link} from 'react-router'

const Navbar = () =>(
	<div>
		<h4>
			<Link to='/artists'>Artists </Link>
			<Link to='/songs'>Songs </Link>
			<Link to='/playlist'>Playlist </Link>
			<Link to='/createplaylist'>Create Playlist </Link>
		</h4>
	</div>
);

export default Navbar;