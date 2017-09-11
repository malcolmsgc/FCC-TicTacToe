import React from 'react';
import PropTypes from 'prop-types';
import './statsbar.css';

class StatsBar extends React.Component {

render() {
    const p1wins = this.props.player1.won;
    const p2wins = this.props.player2.won;
    const draws = this.props.gamesPlayed - (p1wins + p2wins);
    return (
        <div className="stats-bar">
            <span className="p1wins">{p1wins}</span>
            <span className="draws">{draws}</span> 
            <span className="p2wins">{p2wins}</span>
        </div>
    );
}

}

StatsBar.PropTypes = {
    player1: PropTypes.object.isRequired,
    player2: PropTypes.object.isRequired,
    gamesPlayed: PropTypes.number.isRequired,
}

export default StatsBar;