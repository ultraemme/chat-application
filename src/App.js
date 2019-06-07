import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './components/Login';
import Lobby from './components/Lobby';

function App() {
  return (
    <Router>
      <>
        <Route exact path='/' component={Login} />
        <Route path='/lobby' component={Lobby} />
      </>
    </Router>
  );
}

export default App;
