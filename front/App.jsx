import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, hashHistory,IndexRoute} from 'react-router';
import Home from './components/Home.jsx'
import Navbar from './components/Navbar.jsx'
import ArtistPage from './components/ArtistPage.jsx'

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
      <Route path="/Home" component={Home} />
      <Route path="/artist" component={ArtistPage}/>
	</Route>
	</Router>,
  document.getElementById('app')
)

export default App;
