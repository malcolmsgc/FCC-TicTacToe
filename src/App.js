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
    this.setBoard = this.setBoard.bind(this);
    this.fillCell = this.fillCell.bind(this);
    this.state = {
      player1: {
        name: '',
        useX: null, //boolean
        won: 0,
        lost: 0,
        turnToGo: true // TO DO set this randomly and alternate each game
      },
      player2: {
        name: '',
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
  
  selectXO(p1useX) {
    const state = {...this.state};
    state.player1.useX = p1useX;
    state.player2.useX = !p1useX;
    this.setState({ player1: state.player1, player2: state.player2 });
  }
  
  setBoard() {
    const freshBoard = {};
    for (let i=1; i <= 9; i++) {
      freshBoard[i] = null;
    }
    this.setState( { board: freshBoard });
    console.log('board reset');
    return this.state.board;
  }

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

//(Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase()
