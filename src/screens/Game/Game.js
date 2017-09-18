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
        this.handleMessageText = this.handleMessageText.bind(this);
        this.state = {
            p1StartedGame: null,
            p1Turn: null,
            // state for cells in gameboard
            board: {},
            gamesPlayed: 0,
            player1: {
                won: 0,
                lost: 0,
              },
              player2: {
                won: 0,
                lost: 0,
              },
        };
    }

    //randomly decide which player gets first turn for game 1
    firstTurn() {
        const p1Turn = Math.random() >= 0.5;
        this.setState({ p1Turn, p1StartedGame: p1Turn });
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


    handleMessageText(newGame) {
        let message;
        if (newGame) {
            const player = this.p1Turn ?  this.props.player1.name : this.props.player2.name;
            message = `${player} to start`;
        }
        else {
            message = "You've still got to do this, Malcolm!!!"
        }
        return message;
    }

    /* ----------------- */
    /* LIFECYCLE METHODS */
    /* ----------------- */
    componentWillMount() {
        this.setBoard();
        this.firstTurn();
    }


    render() {
        const newGame = true; //need to add logic to do this
        return (
            <div className="game">
                <ScoreBoard p1name={this.props.player1.name}
                            p2name={this.props.player2.name}
                            p1wins={this.props.player1.won}
                            p2wins={this.props.player2.won} />
                <StatsBar   player1={this.props.player1}
                            player2={this.props.player2}
                            gamesPlayed={this.props.gamesPlayed} />
                <MessageBlock messageText={this.handleMessageText(newGame)} />
                <GameBoard board={this.state.board} fillCell={this.props.fillCell}/>
                <BaseButton buttonType="button" buttonText="Go Back" btnAction={ () => { this.props.history.goBack() } }/>
            </div>
        );
    }

}

Game.PropTypes = {
    player1: PropTypes.object.isRequired,
    player2: PropTypes.object.isRequired,
    board: PropTypes.object.isRequired,
    gamesPlayed: PropTypes.number.isRequired,
    fillCell: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
}

export default Game;