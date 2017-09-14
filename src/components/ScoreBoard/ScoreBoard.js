import React from 'react';
import PropTypes from 'prop-types';
import './scoreboard.css';

class ScoreBoard extends React.Component {

    render() {
        return (
            <div className="scoreboard">
                <div id="p1sboard">
                    <div className="player-name">{this.props.p1name}</div>
                    <div className="player-score">{this.props.p1wins}</div>
                </div>
                <div id="p2sboard">
                    <div className="player-name">{this.props.p2name}</div>
                    <div className="player-score">{this.props.p2wins}</div>
                </div>
            </div>
        );
    }

}

ScoreBoard.PropTypes = {
    p1name: PropTypes.string.isRequired,
    p2name: PropTypes.string.isRequired,
    p1wins: PropTypes.number.isRequired,
    p2wins: PropTypes.number.isRequired,
}

export default ScoreBoard;