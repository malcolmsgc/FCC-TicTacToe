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
    this.setBoard = this.setBoard.bind(this);
    this.fillCell = this.fillCell.bind(this);
    this.isTwoPlayer = this.isTwoPlayer.bind(this);
    this.createGameLink = this.createGameLink.bind(this);
    this.state = {
      player1: {
        name: 'Player 1',
        useX: null, //boolean
        won: 0,
        lost: 0,
        turnToGo: true // TO DO set this randomly and alternate each game
      },
      player2: {
        name: 'Player 2',
        useX: null, //boolean
        won: 0,
        lost: 0,
        playerIsComputer: false
      },
      gamesPlayed: 0,
      player2Link: '',
      // state for cells in gameboard
      board: {}
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
    player2.name = 'Robo';

    // if 2 player generate unique game link
    this.createGameLink();
    // update state with link
    // update router with link
    // use hash as id for game on firebase
    this.setState({ player2 });
  }

  /* Create unique game link */
  /* uses date string converted to base 36 plus suffix of random base 16 numbers */
  createGameLink() {
    const unique = (Date.now().toString(36) + (Math.random() * 10).toString(16).substr(2, 4));
    console.log(unique);
  }

  /* Sets player X or O symbols based on single player choosing a symbol */
  /* argument is boolean that relates to if player one chose X */
  selectXO(p1useX) {
    const state = {...this.state};
    state.player1.useX = p1useX;
    state.player2.useX = !p1useX;
    this.setState({ player1: state.player1, player2: state.player2 });
  }
  
  /* set or reset board */
  /* called before mounting app and after each game */
  setBoard() {
    const freshBoard = {};
    for (let i=1; i <= 9; i++) {
      freshBoard[i] = null;
    }
    this.setState( { board: freshBoard });
    console.log('board reset');
    return this.state.board;
  }

  /* changes state for board to update game cell */
  /* used in game cell to show correct symbol as svg or state value as alt attribute */
  fillCell(cell) {
    if (cell < 1 || cell > 9 ) {
      const err = new Error(`Cell ${cell} does not exist`);
      console.error(err);
      return;
    }
    if (this.state.board[cell]) {
      console.warn(`cell already has value ${this.state.board[cell]}`);
      return;
    }
    const player1 = {...this.state.player1}
    const board = {...this.state.board}
    const symbol = player1.turnToGo ? ( player1.useX ? "X" : "O" ) : 
                                      ( player1.useX ? "O" : "X" );
    board[cell] = symbol;
    player1.turnToGo = !player1.turnToGo;
    this.setState( { player1, board } );
  }
  
  /* ---------- */
  /* GAME LOGIC */
  /* ---------- */
  

  /* ----------------- */
  /* LIFECYCLE METHODS */
  /* ----------------- */

  componentWillMount() {
    this.setBoard();
   }


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
                                                                                    p2IsComp={this.state.player2.playerIsComputer}
                                                                                    /> 
                                                  } />
              <Route exact path="/xo" render={ ({match, history}) => <XorO  match={match} 
                                                                            history={history}
                                                                            player1name={this.state.player1.name} 
                                                                            p1useX={this.state.player1.useX}
                                                                            selectXO={this.selectXO}
                                                      /> } 
                                                />
              <Route path="/gameon" render={ () => <Game  player1={this.state.player1}
                                                          player2={this.state.player2} 
                                                          gamesPlayed={this.state.gamesPlayed}
                                                          board={this.state.board}
                                                          fillCell={this.fillCell}
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


