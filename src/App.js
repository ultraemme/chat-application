import React, { lazy, Suspense } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './components/Login';
const Lobby = lazy(() => import('./components/Lobby'));

function App() {
  return (
    <Router>
      <>
        <Route exact path='/' component={Login} />
        <Route path='/lobby' component={LazyComponent(Lobby)} />
      </>
    </Router>
  );
}

function LazyComponent(Component) {
  return props => (
    <Suspense fallback={<div>Loading...</div>}>
      <Component {...props}/>
    </Suspense>
)
}

export default App;
