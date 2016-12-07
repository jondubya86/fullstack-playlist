import React from 'react';

const Player=(props)=>{
	return (
		<div>
			<iframe id="ytplayer" type="text/html" width="640" height="360"
			src={`${props.youtube.replace('watch?v=', 'embed/')}?origin=http://localhost:99.com`}></iframe>
		</div>
		)
}

export default Player;