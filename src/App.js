import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './components/Login';
import Lobby from './components/Lobby';

function App() {
  return (
    <Router>
      <div>
        <Route exact path='/' component={Login} />
        <Route path='/lobby' component={Lobby} />
      </div>
    </Router>
  );
}

export default App;
