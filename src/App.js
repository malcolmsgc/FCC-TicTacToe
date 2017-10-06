import React from 'react';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import rebase from './rebase.js';
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
      app:  {
        player1: {
          name: 'Player 1',
          useX: null, //boolean
        },
        player2: {
          name: 'Player 2',
          useX: null, //boolean
          playerIsComputer: null,
          gamekey: null,
        },
    }
  };
}

  /* --------- */
  /* APP LOGIC */
  /* --------- */

  /* update state to reflect if 1 or 2 player game */
  /* also sets computer's player details if single player game */
  /* argument is boolean that relates to if 2 player game (true) or one (false) */
  isTwoPlayer(twoPlayer) {
    const app = {...this.state.app};
    const player2 = app.player2;
    // set p2's playerIsComputer boolean
    player2.playerIsComputer = !twoPlayer;
    // if single player game set computer details for player 2
    if (!twoPlayer) {
      player2.name = 'Robo';
    }
    // if 2 player generate unique game link
    // update state with link
    else {
      if (twoPlayer && !player2.gamekey) {
      player2.gamekey = this.createGameLink();
      }
      else { console.log( 'P2 link already generated' ); }
      }
      // init firebase rebase listener for App state
      this.rebase = {};
      this.rebaseAppRef = rebase.syncState(
        // use gamekey as id for FireBase DB
        `${player2.gamekey}/app`,
        {
          context: this, //app class
          state: 'app',
        }
      );
      app.player2 = player2;
    this.setState({ app });
  }

  addName({playerNum, playerName} = {}) {
    const app = {...this.state.app};
    app[`player${playerNum}`]['name'] = playerName;
    this.setState({ app });
  }

  /* Create unique game link */
  /* uses date string converted to base 36 plus suffix of random base 16 numbers */
  createGameLink() {
    return (Date.now().toString(36) + (Math.random() * 10).toString(16).substr(2, 4));
  }

  /* Sets player X or O symbols based on single player choosing a symbol */
  /* argument is boolean that relates to if player one chose X */
  selectXO(p1useX) {
    const app = {...this.state.app};
    app.player1.useX = p1useX;
    app.player2.useX = !p1useX;
    this.setState({ app });
  }


  /* ----------------- */
  /* LIFECYCLE METHODS */
  /* ----------------- */

  componentWillUnmount() {
      rebase.removeBinding(this.rebase.app);
  }

  componentWillMount() {
    // remove old firebase DB entries
}

  render() {
    const p2isComp = this.state.app.player2.playerIsComputer;
    return (
      <div className="App">
          <Header />
          <div className="app-wrapper">
          <BrowserRouter>
            <Switch>
              <Route exact path="/" render={ () => <NumPlayers isTwoPlayer={this.isTwoPlayer} />} />
              <Route  path="/name/:player"
                      render={ ({match, history}) => (p2isComp === null) ?  (<Redirect to="/" />) :
                                                                            (<EnterName 
                                                                            match={match}
                                                                            history={history}
                                                                            addName={this.addName}
                                                                            gamekey={this.state.app.player2.gamekey}
                                                                            />)
                      } 
              />
              <Route  exact path="/xo" 
                      render={ ({match, history}) => (p2isComp === null) ?  (<Redirect to="/" />) :
                                                                            (<XorO  match={match}
                                                                            history={history}
                                                                            player1name={this.state.app.player1.name}
                                                                            p1useX={this.state.app.player1.useX}
                                                                            selectXO={this.selectXO}
                                                                            twoPlayer={!this.state.app.player2.playerIsComputer}
                                                                            gamekey={this.state.app.player2.gamekey}
                                                                            />) 
                      }
              />
              <Route  path="/gameon" 
                      render={ ({match, history}) => (p2isComp === null) ?  (<Redirect to="/" />) :
                                                                            (<Game  player1={this.state.app.player1}
                                                                            player2={this.state.app.player2}
                                                                            match={match}
                                                                            history={history}
                                                                            />) 
                      }
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


