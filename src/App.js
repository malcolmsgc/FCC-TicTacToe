import React from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import Header from './components/Header/Header.js';
import NumPlayers from './screens/NumPlayers/NumPlayers.js';
import EnterName from './screens/EnterName/EnterName.js';
import XorO from './screens/XorO/XorO.js';
import notFound from './screens/notFound.js';
import Game from './screens/Game/Game.js';
import './app.css';

class App extends React.Component {

  constructor() {
    super();
    this.selectXO = this.selectXO.bind(this);
    this.isTwoPlayer = this.isTwoPlayer.bind(this);
    this.createGameLink = this.createGameLink.bind(this);
    this.addName = this.addName.bind(this);
    this.state = {
      player1: {
        name: 'Player 1',
        useX: null, //boolean
      },
      player2: {
        name: 'Player 2',
        useX: null, //boolean
        playerIsComputer: false,
        remoteLink: null,
      },
    }
  }

  /* --------- */
  /* APP LOGIC */
  /* --------- */

  /* update state to reflect if 1 or 2 player game */
  /* also sets computer's player details if single player game */
  /* argument is boolean that relates to if 2 player game (true) or one (false) */
  isTwoPlayer(twoPlayer) {
    const player2 = {...this.state.player2};
    // set p2's playerIsComputer boolean
    player2.playerIsComputer = !twoPlayer;
    // if single player game set computer details for player 2
    if (!twoPlayer) {
      player2.name = 'Robo';
    }
    // if 2 player generate unique game link
    // update state with link
    if (twoPlayer && !player2.remoteLink) {
      player2.remoteLink = this.createGameLink();
    }
    else { console.log( 'P2 link already generated' ); }
    // update router with link

    // TO DO

    // use hash as id for game on firebase
    this.setState({ player2 });
  }

  addName({playerNum, playerName} = {}) {
    const playerState = {...this.state[`player${playerNum}`]};
    playerState.name = playerName;
    this.setState({ [`player${playerNum}`]: playerState });
  }

  /* Create unique game link */
  /* uses date string converted to base 36 plus suffix of random base 16 numbers */
  createGameLink() {
    const player2 = {...this.state.player2 }
    const unique = (Date.now().toString(36) + (Math.random() * 10).toString(16).substr(2, 4));
    return unique;
  }

  /* Sets player X or O symbols based on single player choosing a symbol */
  /* argument is boolean that relates to if player one chose X */
  selectXO(p1useX) {
    const state = {...this.state};
    state.player1.useX = p1useX;
    state.player2.useX = !p1useX;
    this.setState({ player1: state.player1, player2: state.player2 });
  }


  /* ----------------- */
  /* LIFECYCLE METHODS */
  /* ----------------- */



  render() {
    return (
      <div className="App">
          <Header />
          <div className="app-wrapper">
          <BrowserRouter>
            <Switch>
              <Route exact path="/" render={ () => <NumPlayers isTwoPlayer={this.isTwoPlayer} />} />
              <Route path="/name/:player" render={ ({match, history}) => <EnterName match={match}
                                                                                    history={history}
                                                                                    addName={this.addName}
                                                                                    player2Link={this.state.player2.remoteLink}
                                                                                    />
                                                  } />
              <Route exact path="/xo" render={ ({match, history}) => <XorO  match={match}
                                                                            history={history}
                                                                            player1name={this.state.player1.name}
                                                                            p1useX={this.state.player1.useX}
                                                                            selectXO={this.selectXO}
                                                      /> }
                                                />
              <Route path="/gameon" render={ ({match, history}) => <Game  player1={this.state.player1}
                                                                          player2={this.state.player2}
                                                                          match={match}
                                                                          history={history}
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


