import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory,IndexRoute} from 'react-router';
import Home from './components/Home.jsx';
import Navbar from './components/Navbar.jsx';
import ArtistPage from './components/ArtistPage.jsx';
import SongsPage from './components/SongsPage.jsx';
import Playlist from './components/Playlist.jsx';
import Player from './components/Player.jsx';
import SingleArtist from './components/SingleArtist.jsx';

const App = (props)=>(
    <div>
    	<Navbar/>
      	{props.children}
    </div>
)

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App} >
      <IndexRoute component={Home} />
      <Route path="player" component={Player}/>
      <Route path="Home" component={Home} />
      <Route path="artists" component={ArtistPage}/>
      <Route path="artists/:id" component={SingleArtist}/>
      <Route path="songs" component={SongsPage}/>
      <Route path="playlist" component={Playlist}/>
	</Route>
	</Router>,
  document.getElementById('app')
);

export default App;