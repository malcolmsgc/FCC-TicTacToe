import React from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import Header from './components/Header/Header.js';
import NumPlayers from './screens/NumPlayers.js';
import EnterName from './screens/EnterName/EnterName.js';
import XorO from './screens/XorO/XorO.js';
import notFound from './screens/notFound.js';
import Game from './screens/Game/Game.js';
import './app.css';

class App extends React.Component {

  constructor() {
    super();
    this.selectXO = this.selectXO.bind(this);
    this.state = {
      player1: {
        name: '',
        useX: null, //boolean
        won: 0,
        lost: 0,
      },
      player2: {
        name: '',
        useX: null, //boolean
        won: 0,
        lost: 0,
        playerIsComputer: false
      },
      gamesPlayed: 0,
      player2Link: ''
    }
  }

  selectXO(p1useX) {
    const state = {...this.state};
    state.player1.useX = p1useX;
    state.player2.useX = !p1useX;
    this.setState({ player1: state.player1, player2: state.player2 });
}

  render() {
    return (
      <div className="App">
          <Header />
          <div className="app-wrapper">
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={NumPlayers} />
              <Route path="/name/:player" render={ ({match, history}) => <EnterName match={match} history={history}/> } />
              <Route exact path="/xo" render={ () => <XorO  player1name={this.state.player1.name} 
                                                            p1useX={this.state.player1.useX}
                                                            selectXO={this.selectXO}
                                                      /> } 
                                                />
              <Route path="/gameon" render={ () => <Game  player1={this.state.player1}
                                                          player2={this.state.player2} 
                                                          gamesPlayed={this.state.gamesPlayed} 
                                                  /> }
                                            />
              <Route component={notFound} />
            </Switch>
          </BrowserRouter>
        </div>
      </div>
    );
  }
}


export default App;

//(Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase()
