import React from 'react';
import PropTypes from 'prop-types';
import StatsBar from '../../components/StatsBar/StatsBar.js';
import MessageBlock from '../../components/MessageBlock/MessageBlock.js';
import ScoreBoard from '../../components/ScoreBoard/ScoreBoard.js';
import GameBoard from '../../components/GameBoard/GameBoard.js';
import BaseButton from '../../components/BaseButton/BaseButton.js';
import './game.css';

class Game extends React.Component {

    constructor() {
        super();
        this.firstTurn = this.firstTurn.bind(this);
        this.setBoard = this.setBoard.bind(this);
        this.fillCell = this.fillCell.bind(this);
        this.handleMessageText = this.handleMessageText.bind(this);
        this.gameInPlay = this.gameInPlay.bind(this);
        this.handleScore = this.handleScore.bind(this);
        this.setLastActive = this.setLastActive.bind(this);
        this.state = {
            // boolean to show if a game has started (false) or is yet to start (true)
            cleanBoard: null,
            // which player started this game - should be swapped at game end
            p1StartedGame: null,
            // flag for each player turn - true mean it is P1 turn
            p1Turn: null,
            // state for cells in gameboard - get initialised with setBoard()
            board: {},
            boardinates: {
                1: [1,1],
                2: [1,2],
                3: [1,3],
                4: [2,1],
                5: [2,2],
                6: [2,3],
                7: [3,1],
                8: [3,2],
                9: [3,3],
            },
            lastActiveCell: null,
            gamesPlayed: 0,
            player1: {
                won: 0,
                lost: 0,
              },
              player2: {
                won: 0,
              },
        };
    }

    /* --------- */
    /* APP LOGIC */
    /* --------- */

    /* set or reset board */
    /* called before mounting app and after each game */
    setBoard() {
        const freshBoard = {};
        for (let i=1; i <= 9; i++) {
        freshBoard[i] = null;
        }
        this.setState( { board: freshBoard, cleanBoard: true });
        console.log('board reset');
        return this.state.board;
    }

    //randomly decide which player gets first turn for game 1
    firstTurn() {
        const p1Turn = Math.random() >= 0.5;
        this.setState({ p1Turn, p1StartedGame: p1Turn });
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
        const board = {...this.state.board};
        const symbol = this.state.p1Turn ?  ( this.props.player1.useX ? "X" : "O" ) :
                                            ( this.props.player1.useX ? "O" : "X" );
        board[cell] = symbol;
        this.setState( { p1Turn: !this.state.p1Turn, board, cleanBoard: false } );
    }

    //TO DO handle messaging for end of game - announce winner
    handleMessageText() {
        const gameInPlay = this.gameInPlay();
        let message;
        const player = this.state.p1Turn ?  this.props.player1.name : this.props.player2.name;
        if (gameInPlay) {
            if (this.state.cleanBoard) {
                message = `${player} to start`;
            }
            else {
                message = `${player}'s turn`;
            }
        }
        else {
            // TO DO - handle winner name
            message = `${player} wins`;
        }
        return message;
    }

    handleScore() {

    }

    /* ---------- */
    /* GAME LOGIC */
    /* ---------- */

    // takes ID from cell on click event and updates state on Game component
    // ID then used to check game progress
    setLastActive(cell) {
        console.log(this);
        this.setState( (prevState) => ({ lastActiveCell: parseInt(cell) }) );
    }

    // a check to see if game is active
    // returns boolean - false if game won/lost/drawn, true if game in progress
    gameInPlay() {
        // if board has been reset return true
        if (this.state.cleanBoard) return true;
        else {
            let gameActive;
            const currentBoard = {...this.state.board};
            const cellNums = Object.keys(currentBoard);
            // check for values in cells
            const boardArray = cellNums.map( (cell) => currentBoard[cell] );
            // check for empty cells
            gameActive = boardArray.includes(null);
            // check for win and override gameActive if win criteria met
            
            return gameActive;
        }
    }

    // charaterises cell as 'lane','centre' or 'corner' which is used to check game progress
    // and determine logic for computer as player 2
    categoriseCell(cellKey) {
        return (cellKey % 2 === 0) ? 'lane' : 
                                            (cellKey === 5 ? 'centre' : 'corner');
    }


    /* ----------------- */
    /* LIFECYCLE METHODS */
    /* ----------------- */
    componentWillMount() {
        this.setBoard();
        this.firstTurn();
    }

    componentWillUpdate() {

    }

    componentWillReceiveProps() {

    }


    render() {
        return (
            <div className="game">
                <ScoreBoard p1name={this.props.player1.name}
                            p2name={this.props.player2.name}
                            p1wins={this.state.player1.won}
                            p2wins={this.state.player2.won} />
                <StatsBar   player1={this.props.player1}
                            player2={this.props.player2}
                            gamesPlayed={this.state.gamesPlayed} />
                <MessageBlock messageText={this.handleMessageText()} />
                <GameBoard board={this.state.board} fillCell={this.fillCell} setLastActive={this.setLastActive}/>
                <BaseButton buttonType="button" buttonText="Go Back" btnAction={ () => { this.props.history.goBack() } }/>
            </div>
        );
    }

}

Game.PropTypes = {
    player1: PropTypes.object.isRequired,
    player2: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
}

export default Game;