import React from 'react';
import './App.css';
import Login from './Login';
import Register from './Register';
import HomeContainer from './HomeContainer';
import UserContainer from './UserContainer';
import { Route, Switch } from 'react-router-dom';
import { tsConstructorType } from '@babel/types';
require('dotenv').config()

const My404 = () => {
  return (
    <div>
      Whoops! You seem to be lost.
    </div>
  )
};

class App() {
  constructor()
  {
    this.state=
    {
      fakeURL: process.env.REACT_APP_BACKEND_URL + '/fakeroute'
    }
  }
  render()
  {
    return (
      <div>
      <main className="App">
      <Iframe url={this.state.fakeURL} display="none"></Iframe>
        <Switch>
          <Route exact path='/' component={ Login } />
          <Route exact path='/register' component={ Register } />
          <Route exact path='/home' component={ HomeContainer } />
          <Route exact path='/mypage' component={ UserContainer } />
          <Route component={My404} />

        </Switch>

      </main>
      </div>
    );
  }
}

export default App;
