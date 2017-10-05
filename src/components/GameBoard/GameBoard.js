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
                                    p2IsComp={this.props.p2IsComp}
                                    p1Turn={this.props.p1Turn}
                                    wonPath={this.props.wonPath}
                                    winner={this.props.winner}
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
    fillCell: PropTypes.func.isRequired,
    p2IsComp: PropTypes.bool.isRequired,
    p1Turn: PropTypes.bool.isRequired,
    cell: PropTypes.string.isRequired,
    wonPath: PropTypes.object,
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
                                    p2IsComp={this.props.p2IsComp}
                                    p1Turn={this.props.p1Turn}
                                    wonPath={this.props.wonPath}
                                    winner={this.props.winner}
                        /> )
                }
            </div>
        );
    }
    
    }
    
    BoardRow.PropTypes = {
        board: PropTypes.object.isRequired,
        fillCell: PropTypes.func.isRequired,
        p2IsComp: PropTypes.bool.isRequired,
        p1Turn: PropTypes.bool.isRequired,
        cell: PropTypes.string.isRequired,
        wonPath: PropTypes.object,
    }

class GameCell extends React.Component {
    
    render() {
        const { cell, fillCell, cellContents, p2IsComp, p1Turn, wonPath, winner } = this.props;
        const onWonPath = wonPath.includes(cell);
        let symbolSrc;
        if (cellContents === "X") symbolSrc = cross;
        else if (cellContents === "O") symbolSrc = nought;
        return (
            <div className={onWonPath ? `game-cell winpath ${winner}` : "game-cell"} onClick={ () => {
                    if (!p2IsComp || (p2IsComp && p1Turn)) {
                        fillCell(cell);
                    } } }>
                { /* display img conditionally */ }
                { symbolSrc ? <object   type="image/svg+xml" 
                                        className="symbolIcon" 
                                        data={symbolSrc} 
                                        aria-label={cellContents} 
                                        >{cellContents}</object> : '' }
                </div>
        );
    }
}
    
    GameCell.PropTypes = {
        fillCell: PropTypes.func.isRequired,
        p2IsComp: PropTypes.bool.isRequired,
        p1Turn: PropTypes.bool.isRequired,
        cell: PropTypes.string.isRequired,
        cellContents: PropTypes.string.isRequired,
        wonPath: PropTypes.object,
    }

export default GameBoard;