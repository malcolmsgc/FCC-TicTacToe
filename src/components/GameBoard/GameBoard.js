import React from 'react';
import PropTypes from 'prop-types';
import './gameboard.css';

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
            <div className="gameboard">
            {
                Object.keys(byRow).map( (key) =>
                    <BoardRow key={key} cells={byRow[key]} />    
                )
            }
            </div>
        );
    }

}

/* END OF GAMEBOARD CLASS */

GameBoard.PropTypes = {
    board: PropTypes.object.isRequired
}

class BoardRow extends React.Component {
    
    render() {
        console.log(this.props.cells);
        return (
            <div className="game-row">
                {
                    this.props.cells.map( key =>
                        <GameCell key={key} cellContents={key}/> )
                }
            </div>
        );
    }
    
    }
    
    BoardRow.PropTypes = {
    }

class GameCell extends React.Component {
    
    render() {
        return (
            <div className="game-cell">{this.props.cellContents}</div>
        );
    }
    
    }
    
    GameCell.PropTypes = {
    }

export default GameBoard;