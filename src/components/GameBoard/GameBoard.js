import React from 'react';
import PropTypes from 'prop-types';
import './gameboard.css';
import cross from '../../assets/cross.svg';
import nought from '../../assets/nought.svg';

class GameBoard extends React.Component {

    /* GAMEBOARD CLASS
    Apologies to the sanity of anyone following this.
    I used a massively overconvoluted bit of logic to render a simple grid. 
    It was an exercise to practise building a proportional grid when given 
    an array or object that hadn't been prepped to suit. 
    */


    render() {
        const cellKeys = Object.keys(this.props.board);
        const numRows = Math.round( Math.sqrt(cellKeys.length) );
        const byRow = {};
        for ( let i = 1, row = 1; i <= 9; i++) {
            if (!byRow[row]) {
                byRow[row] = [];
            }
            byRow[row].push(cellKeys[i - 1]);
            if ( i % numRows === 0 ) {
                row++;
            }
        }
        return (
            <section className="gameboard">
                <div className="board">
                {
                    Object.keys(byRow).map( (key) =>
                        <BoardRow   key={key} 
                                    cells={byRow[key]} 
                                    board={this.props.board}
                                    fillCell={this.props.fillCell}
                                    />    
                    )
                }
                </div>
            </section>
        );
    }

}

/* END OF GAMEBOARD CLASS */

GameBoard.PropTypes = {
    board: PropTypes.object.isRequired,
    fillCell: PropTypes.func.isRequired
}

class BoardRow extends React.Component {
    
    render() {
        return (
            <div className="game-row">
                {
                    this.props.cells.map( key =>
                        <GameCell   key={key}
                                    cell={key}
                                    cellContents={this.props.board[key]}
                                    fillCell={this.props.fillCell}
                        /> )
                }
            </div>
        );
    }
    
    }
    
    BoardRow.PropTypes = {
        fillCell: PropTypes.func.isRequired
    }

class GameCell extends React.Component {
    
    render() {
        const { cell, fillCell, cellContents } = this.props;
        let symbolSrc;
        if (cellContents === "X") symbolSrc = cross;
        else if (cellContents === "O") symbolSrc = nought;
        return (
            <div className="game-cell" onClick={ () => {
                    fillCell(cell);
                    } }>
                { /* display img conditionally */ }
                { symbolSrc ? <img className="symbolIcon" src={symbolSrc} alt={cellContents}/> : '' }
                </div>
        );
    }
}
    
    GameCell.PropTypes = {
        fillCell: PropTypes.func.isRequired,
    }

export default GameBoard;