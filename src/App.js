import React from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import Header from './components/Header/Header.js';
import NumPlayers from './screens/NumPlayers.js';
import EnterName from './screens/EnterName/EnterName.js';
import XorO from './screens/XorO/XorO.js';
import notFound from './screens/notFound.js';
import './app.css';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      player1: {
        name: 'Fred',
        useX: true, //boolean
        won: 0,
        lost: 0,
      },
      player2: {
        name: '',
        useX: undefined, //boolean
        won: 0,
        lost: 0,
        playerIsComputer: false
      },
      gamesPlayed: 0,
      player2Link: ''
    }
  }

  render() {
    return (
      <div className="App">
        <Header />
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={NumPlayers} />
            <Route path="/name/:player" render={ ({match, history}) => <EnterName match={match} history={history}/> } />
            <Route exact path="/xo" render={ () => <XorO playername={this.state.player1.name} p1useX={this.state.player1.useX}/>} />
            <Route component ={notFound} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}


export default App;

//(Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase()
