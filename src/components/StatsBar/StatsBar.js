import React from 'react';
import PropTypes from 'prop-types';
import './statsbar.css';

class StatsBar extends React.Component {


updateStats() {
    const gamesPlayed = this.props.gamesPlayed;
    if (gamesPlayed > 0) {
        const p1wins = this.props.player1.won;
        const p2wins = this.props.player2.won;
        const draws = gamesPlayed - (p1wins + p2wins);
        console.log(`Draws: ${draws / gamesPlayed * 100}%`);
        console.log(`P1: ${p1wins / gamesPlayed * 100}%`);
        console.log(`P2: ${p2wins / gamesPlayed * 100}%`);
        this.drawStats.style.setProperty("--draws", `${draws / gamesPlayed * 100}%`);
        this.p1Stats.style.setProperty("--p1wins", `${p1wins / gamesPlayed * 100}%`);
        this.p2Stats.style.setProperty("--p2wins", `${p2wins / gamesPlayed * 100}%`);
    }
}

componentWillUpdate() {
    this.updateStats();
}

render() {
    return (
        <div className="stats-bar">
            <span className="p1wins" ref={ (node) => {this.p1Stats = node} }></span>
            <span className="draws" ref={ (node) => {this.drawStats = node} }></span> 
            <span className="p2wins" ref={ (node) => {this.p2Stats = node} }></span>
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