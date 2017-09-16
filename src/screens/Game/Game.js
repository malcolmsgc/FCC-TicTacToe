import React from 'react';
import PropTypes from 'prop-types';
import StatsBar from '../../components/StatsBar/StatsBar.js';
import MessageBlock from '../../components/MessageBlock/MessageBlock.js';
import ScoreBoard from '../../components/ScoreBoard/ScoreBoard.js';
import GameBoard from '../../components/GameBoard/GameBoard.js';
// import './game.css';

class Game extends React.Component {

render() {
    return (
        <div>
            <ScoreBoard p1name={this.props.player1.name}
                        p2name={this.props.player2.name}
                        p1wins={this.props.player1.won}
                        p2wins={this.props.player2.won} />
            <StatsBar   player1={this.props.player1}
                        player2={this.props.player2}
                        gamesPlayed={this.props.gamesPlayed} />
            <MessageBlock messageText="TO DO: Make this dynamic" />
            <GameBoard board={this.props.board} fillCell={this.props.fillCell}/>
        
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
}

export default Game;