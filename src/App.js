import React from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import Header from './components/Header/Header.js';
import NumPlayers from './screens/NumPlayers.js';
import EnterName from './screens/EnterName/EnterName.js';
import notFound from './screens/notFound.js';
import './app.css';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      player1: {
        name: '',
        useX: undefined, //boolean
        won: 0,
        lost: 0,
      },
      player2: {
        name: '',
        useX: undefined, //boolean
        won: 0,
        lost: 0,
        playerIsComputer: false;
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
            <Route path="/names" render={ () => <EnterName playerNum={1}/> } />
            <Route component ={notFound} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
