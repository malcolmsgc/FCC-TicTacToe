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
        this.handleMessageText = this.handleMessageText.bind(this);
        this.state = {
            p1StartedGame: null,
            p1Turn: null,
        };
    }

    //randomly decide which player gets first turn for game 1
    firstTurn() {
        const p1Turn = Math.random() >= 0.5;
        this.setState({ p1Turn, p1StartedGame: p1Turn });
    }

    componentWillMount() {
        this.firstTurn();
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
                <GameBoard board={this.props.board} fillCell={this.props.fillCell}/>
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