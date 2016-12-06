import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, hashHistory,IndexRoute} from 'react-router';

const App = (props)=>(
    <div>
      <h1> Hey! </h1>
    </div>
)

ReactDOM.render(
  <App />,
  document.getElementById('app')
)

export default App;
