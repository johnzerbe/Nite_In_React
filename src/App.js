import React from 'react';
import './App.css';
import Login from './Login';
import Register from './Register';
import HomeContainer from './HomeContainer';
import { Route, Switch } from 'react-router-dom';

const My404 = () => {
  return (
    <div>
      Whoops! You seem to be lost.
    </div>
  )
};

function App() {
  return (
    <main className="App">
      <Switch>
        <Route exact path='/' component={ Login } />
        <Route exact path='/register' component={ Register } />
        <Route exact path='/home' component={ HomeContainer } />
        <Route component={My404} />
      </Switch>
    </main>
  );
}

export default App;
