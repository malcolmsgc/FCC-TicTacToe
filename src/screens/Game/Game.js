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
        this.runGameLogic = this.runGameLogic.bind(this);
        this.fillCell = this.fillCell.bind(this);
        this.handleMessageText = this.handleMessageText.bind(this);
        this.gameInPlay = this.gameInPlay.bind(this);
        this.handleScore = this.handleScore.bind(this);
        this.compAsP2 = this.compAsP2.bind(this);
        this.setWinPathCount = this.setWinPathCount.bind(this);
        this.state = {
            // boolean to show if a game has started (false) or is yet to start (true)
            // used for message block
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
            gameInPlay: null,
            gameWon: null,
            gamesPlayed: 0,
            player1: {
                won: 0,
                count: {
                    diag: [0,0], //index 0 is top left to bottom right, 1 is top right to bottom left
                    row: [0,0,0], // row 1-3
                    col: [0,0,0], // column 1-3
                }
              },
              player2: {
                won: 0,
                count: {
                    diag: [0,0], //index 0 is top left to bottom right, 1 is top right to bottom left
                    row: [0,0,0], // row 1-3
                    col: [0,0,0], // column 1-3
                }
              },
            gameMessage: null,
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
        if (this.props.player2.playerIsComputer) this.setWinPathCount();
        this.setState( {    cleanBoard: true,
                            board: freshBoard,
                            gameInPlay: true,
                            gameWon: false,
                        }, 
                        () => { 
                            const gameMessage = this.handleMessageText();
                            this.setState({ gameMessage }); 
                        });
        // trigger compAsP2 on board reset if P2 turn and P2 is computer
        if (!this.state.p1Turn && this.props.player2.playerIsComputer) {
            setTimeout(this.compAsP2, 2000)
        }
        console.log('board reset');
    }

    //randomly decide which player gets first turn for game 1
    firstTurn() {
        const p1Turn = Math.random() >= 0.5;
        this.setState({ p1Turn, p1StartedGame: p1Turn });
    }


    /* changes state for board to update game cell */
    /* used in game cell to show correct symbol as svg or state value as alt attribute */
    fillCell(cell) {
        // return if game over
        if (!this.state.gameInPlay) return;
        // return if cell already filled
        // false flag used by compAsP2 to run recursively if a chosen cell is full
        if (this.state.board[cell]) return false;
        // error is cell value higher than numbers in grid
        if (cell < 1 || cell > 9 ) {
            const err = new Error(`Cell ${cell} does not exist`);
            console.error(err);
            return false;
        }
        const board = {...this.state.board};
        const symbol = this.state.p1Turn ?  ( this.props.player1.useX ? "X" : "O" ) :
                                            ( this.props.player1.useX ? "O" : "X" );
        board[cell] = symbol;
        this.setState( { board, cleanBoard: false }, () => { this.runGameLogic(cell) } );
        return true;
    }

    //TO DO handle messaging for end of game - announce winner
    handleMessageText() {
        const { gameInPlay, cleanBoard, gameWon } = this.state;
        let message;
        const player = this.state.p1Turn ?  this.props.player1.name : this.props.player2.name;
        if (gameInPlay) {
            if (cleanBoard) {
                message = `${player} to start`;
            }
            else {
                message = `${player}'s turn`;
            }
        }
        else {
            //
            if (gameWon) {
                message = `${player} wins`;
            }
            else {
                message = "It's a draw!";
            }
        }
        return message;
    }


    // function to update score
    // also handles switch of player turn
    handleScore() {
        const state = {...this.state};
        if (!state.gameInPlay) {
            state.gameMessage = this.handleMessageText();
            if (state.gameWon) {
                if (state.p1Turn) { 
                    state.player1.won++;
                }
                else {
                    state.player2.won++;
                }
            }
            console.log(state.player1.won, state.player2.won);
            state.gamesPlayed++;
            //set first turn to player who went second at beginning of last game
            state.p1Turn = !state.p1StartedGame;
            state.p1StartedGame = !state.p1StartedGame;
            //update state for new game and updated scores.
            this.setState({ p1Turn: state.p1Turn,
                            p1StartedGame: state.p1StartedGame,
                            player1: state.player1,
                            player2: state.player2,
                            gamesPlayed: state.gamesPlayed,
                            gameMessage: state.gameMessage,
                        }
                            // can replace this callback setTimeout with a user event
                        , () => { window.setTimeout(this.setBoard, 2800) } );
        }
        else {
            this.setState( { p1Turn: !state.p1Turn }, 
                () => { state.gameMessage = this.handleMessageText();
                    this.setState({ gameMessage: state.gameMessage });
                    // run compAsP2 if p2 turn and playerIsComputer set to true
                    if (!this.state.p1Turn && this.props.player2.playerIsComputer) setTimeout(this.compAsP2, 2000);
                }
            );
        }
    }

    /* ---------- */
    /* GAME LOGIC */
    /* ---------- */

    // wrapper function to bundle functions to run on click of board cell
    runGameLogic(cellID) {
        //set cellID to type number to avoid strict matching errors
        const cellNum = parseInt(cellID, 10);
        this.gameInPlay(cellNum);
    }
    
    // a check to see if game is active
    // returns boolean - false if game won/lost/drawn, true if game in progress
    gameInPlay(cellID) {
        // if board has been reset return true
        let gameActive;
        if (this.state.cleanBoard) { gameActive = true }
        else {
            const currentBoard = {...this.state.board};
            const cellNums = Object.keys(currentBoard);
            // check for values in cells
            const boardArray = cellNums.map( (cell) => currentBoard[cell] );
            // check for empty cells
            gameActive = boardArray.includes(null);
            // check for win and override gameActive if win criteria met
            const gameWon = this.isGameWon(cellID);
            gameActive = gameWon ? false : gameActive;
            // update state with new gameInPlay flag
            this.setState({ gameInPlay: gameActive, gameWon },
                // callback runs handles score, which in turn has a setState call back to setBoard
                // so that they state setting in each case is syncronous 
                                () => {  this.handleScore(); } );
        }
    }
    
    // checks for cell position and then add layers of checks for line of matches
    // centre cell needs checks on both diagonals
    // corners need a single diagonal
    // then all cell positions needs checks on row and column
    isGameWon(cellKey) {
        console.log(cellKey);
        const p2IsComputer = this.props.player2.playerIsComputer;
        const category = this.categoriseCell(cellKey);
        const symbol = this.state.board[cellKey];
        let [ rowCoord, colCoord ] = this.state.boardinates[cellKey];
        console.log(category, rowCoord, colCoord, symbol);
        //initialise counters
        let diag1Count, diag2Count, rowCount = 1, colCount = 1;
        if (category === 'centre') {
            console.log('diagonals');
            // check diagonal 1
            [ diag1Count, diag2Count] = [1, 1];
            let [ diag1R, diag1C ] = [ rowCoord, colCoord ];
            diag1Count = this.checkCellSymbol(diag1R - 1, diag1C - 1, symbol, diag1Count);
            diag1Count = this.checkCellSymbol(diag1R + 1, diag1C + 1, symbol, diag1Count);
            // check diagonal 2
            let [ diag2R, diag2C ] = [ rowCoord, colCoord, 1 ];
            diag2Count = this.checkCellSymbol(diag2R - 1, diag2C + 1, symbol, diag2Count);
            diag2Count = this.checkCellSymbol(diag2R + 1, diag2C - 1, symbol, diag2Count);
        }
        if (category === 'corner') {
            // function to check whether to increment or decrement row and column coords
            // args are booleans that increment if true and decrement if false
            console.log('diagonal');
            let [ diagR, diagC ] = [ rowCoord, colCoord ];
            const isDiag1 = (cellKey === 1 || cellKey === 9);
            if (isDiag1) diag1Count = 1;
            else diag2Count = 1;
            for (let i = 0; i < 2; i++) {
                if (rowCoord < 2) {
                    diagR++;
                }
                else {
                    diagR--;
                }
                if (colCoord < 2) diagC++;
                else diagC--;
                if (isDiag1) {
                    diag1Count = this.checkCellSymbol(diagR, diagC, symbol, diag1Count);
                }
                else {
                    diag2Count = this.checkCellSymbol(diagR, diagC, symbol, diag2Count);
                }
            }
        }
        // -- column
        let rowWorkingCoord = rowCoord;
        console.log('column');
        for (let i = 0, step = 1; i < 2; i++) {
            if (rowCoord < 2) rowWorkingCoord++;
            else if (rowCoord > 2) rowWorkingCoord--;
            else rowWorkingCoord = rowCoord + step;
            step *= -1;
            colCount = this.checkCellSymbol(rowWorkingCoord, colCoord, symbol, colCount);
        }
        // -- row
        let colWorkingCoord = colCoord;
        console.log('row');
        for (let i = 0, step = 1; i < 2; i++) {
            if (colCoord < 2) colWorkingCoord++;
            else if (colCoord > 2) colWorkingCoord--;
            else colWorkingCoord = colCoord + step;
            step *= -1;
            rowCount = this.checkCellSymbol(rowCoord, colWorkingCoord, symbol, rowCount);
        }
        console.log(`COUNTERS: diag1:${diag1Count}, diag2:${diag2Count}, row:${rowCount}, col:${colCount}`);
        // store counts for diags, rows, cols for comp to use as player 2
        if (p2IsComputer) {
            const playerTurn = this.state.p1Turn ? 'player1' : 'player2';
            const player = {...this.state[playerTurn]};
            // initialise vars to hold count arrays
            let { diag, row, col } = player.count;
            if (diag1Count) diag.splice(0, 1, diag1Count);
            if (diag2Count) diag.splice(1, 1, diag2Count);
            // set arrays for row and col
            // one entry per row/col
            // index is (co-ord - 1)
            row.splice(rowCoord - 1, 1, rowCount);
            col.splice(colCoord - 1, 1, colCount);
            this.setState({ [`${player}`]: player });
        }
        const gameWon = [ diag1Count, diag2Count, rowCount, colCount ].some( (count) => count >=3 );
        if (gameWon) {
            // return true which can be used to override GameActive boolean in gameInPlay function
            return true;
        }
    }

    // used in isGameWon func to check number of cells in line with symbol
    checkCellSymbol(ActiveRowCoord, ActiveColCoord, symbol, counter) {
        const { boardinates, board } = this.state;
        for (const [cell, [rowCoord, colCoord]] of Object.entries(boardinates)) {
            if (rowCoord === ActiveRowCoord && colCoord === ActiveColCoord) {
                console.log(`Check cell ${cell}`);
                if (board[cell] === symbol) counter++;
            }
        }
        return counter;
    }
    
    // characterises cell as 'lane','centre' or 'corner' which is used to check game progress
    // and determine logic for computer as player 2
    categoriseCell(cellKey) {
        return (cellKey % 2 === 0) ? 'lane' : 
                                            (cellKey === 5 ? 'centre' : 'corner');
    }

    compAsP2() {
        // exit if player 1's turn
        if (this.state.p1Turn) return;
        console.log('****** compAsP2 ******');
        let     cellNum;
        const   p1Count = this.state.player1.count,
                p2Count = this.state.player2.count;
        
        console.log({p1Count, p2Count});
        // look for player 2 game winning moves
        let p2WinningCells = this.findWinningCells(p2Count);
        if (p2WinningCells.length >= 1) cellNum = p2WinningCells[0]; // TO DO: MAKE THIS RANDOM SELECTION
        // check opponent's positions and block any moves that would win the game
        else {
            let p1WinningCells = this.findWinningCells(p1Count);
            if (p1WinningCells.length >= 1) cellNum = p1WinningCells[0]; // TO DO: MAKE THIS RANDOM SELECTION
            else cellNum = prompt('Enter cell ID');
        }
        // check for open paths for potential win
        // if no moves yet select cell at random
        // place symbol
        const symbolPlaced = this.fillCell(cellNum);

        if (!symbolPlaced) {
            //this.compAsP2();
        }

    }

    findWinningCells( countObject ) {
        const   { board, boardinates } = this.state;
        const   boardinatesFlattened = Object.entries(boardinates); 
        let winCellsArray = Object.entries( countObject ).map( (array) => { 
            const [ category, countArray ] = array;
            // winCell var to show which cells would produce a winning move - shows coords
            // first step is to tell if at least two symbols in win path
            // at this point this ignores whether the 3rd cell in win path is occupied
            let winCells = countArray.reduce( (min2indexes, count, index) =>  {
                console.log(category, count, index);
                if (count >= 2) min2indexes.push(index);
                return min2indexes;
            }, [] )
                // chain reduce to
                //check if 3rd cell vacant
                .reduce( (min2indexes, catIndex) => {
                    let cellIDs = [];
                    if (category === "col") {    
                        for (let i = 1; i <= 3; i++) {
                            cellIDs = cellIDs.concat(
                                boardinatesFlattened.reduce( 
                                    (categCellIDs, keyValueArray) => { 
                                    // find matching board coordinate
                                    // index adjusted to boardinate index origin 1
                                    if (    keyValueArray[1][0] === i &&
                                            keyValueArray[1][1] === catIndex + 1 ) {
                                        // use key to check board object for a value
                                        // if value is null return the cell ID
                                        if (!board[keyValueArray[0]]) {
                                            console.log(category);
                                            console.log(`win cell is ${keyValueArray[0]}`);
                                            categCellIDs.push(keyValueArray[0]);
                                        }
                                    }
                                    return categCellIDs;
                                }, [] ) // end of reduce
                            ); // end of concat parens
                        }
                    }
                    else if (category === "row") {    
                        for (let i = 1; i <= 3; i++) {
                            cellIDs = cellIDs.concat(
                                boardinatesFlattened.reduce( 
                                    (categCellIDs, keyValueArray) => { 
                                    // find matching board coordinate
                                    // index adjusted to boardinate index origin 1
                                    if (    keyValueArray[1][0] === catIndex + 1 &&
                                            keyValueArray[1][1] === i ) {
                                        // use key to check board object for a value
                                        // if value is null return the cell ID
                                        if (!board[keyValueArray[0]]) {
                                            console.log(category);
                                            console.log(`win cell is ${keyValueArray[0]}`);
                                            categCellIDs.push(keyValueArray[0]);
                                        }
                                    }
                                    return categCellIDs;
                                }, [] ) // end of reduce
                            ); // end of concat parens
                        }
                    }
                    else if (category === "diag") {    
                        // diag 1 - top left to bottom right
                        if ( catIndex === 0 ) {
                            for (let i = 1; i <= 3; i++) {
                                cellIDs = cellIDs.concat(
                                    boardinatesFlattened.reduce( 
                                        (categCellIDs, keyValueArray) => { 
                                        // find matching board coordinate
                                        if (    keyValueArray[1][0] === i &&
                                                keyValueArray[1][1] === i ) {
                                            // use key to check board object for a value
                                            // if value is null return the cell ID
                                            if (!board[keyValueArray[0]]) {
                                                console.log(category);
                                                console.log(`win cell is ${keyValueArray[0]}`);
                                                categCellIDs.push(keyValueArray[0]);
                                            }
                                        }
                                        return categCellIDs;
                                    }, [] ) // end of reduce
                                ); // end of concat parens
                            }
                        }
                        // diag 2 - top right to bottom left
                        if ( catIndex === 1 ) {
                            for (let row = 1, col = 3; (row <= 3 || col >= 1); row++, col--) {
                                cellIDs = cellIDs.concat(
                                    boardinatesFlattened.reduce( 
                                        (categCellIDs, keyValueArray) => { 
                                        // find matching board coordinate
                                        if (    keyValueArray[1][0] === row &&
                                                keyValueArray[1][1] === col ) {
                                            // use key to check board object for a value
                                            // if value is null return the cell ID
                                            if (!board[keyValueArray[0]]) {
                                                console.log(category);
                                                console.log(`win cell is ${keyValueArray[0]}`);
                                                categCellIDs.push(keyValueArray[0]);
                                            }
                                        }
                                        return categCellIDs;
                                    }, [] ) // end of reduce
                                ); // end of concat parens
                            }
                        }
                    }
                    else {
                        console.error( new Error('no category matched in count object') );
                    }
                    
                    return min2indexes.concat(cellIDs);
                            }, []);  
            // returns cell IDs of empty cells in win path   
            return winCells;
        });
        // flatten winCellsArray
        winCellsArray = winCellsArray.reduce( (accum, array) => {
            return accum = [ ...accum, ...array ];
        } , [] );
        console.log('WIN CELLS: ', winCellsArray);
        return winCellsArray;
    }

    setWinPathCount() {
        const count = {
            diag: [0,0], //index 0 is top left to bottom right, 1 is top right to bottom left
            row: [0,0,0], // row 1-3
            col: [0,0,0], // column 1-3
        };
        const { player1, player2 } = this.state;
        player1.count = count;
        player2.count = count;
        this.setState({ player1, player2 });
    }


    /* ----------------- */
    /* LIFECYCLE METHODS */
    /* ----------------- */


    componentWillMount() {
        // set up counter and booleans to handle player turns between games
        // must run before setBoard so compAsP2 triggers accurately
        this.firstTurn();
        // set up fresh board
        // also triggers compAsP2 on board reset if P2 turn and P2 is computer
        this.setBoard();
    }
        
    render() {
        return (
            <div className="game">
                <ScoreBoard p1name={this.props.player1.name}
                            p2name={this.props.player2.name}
                            p1wins={this.state.player1.won}
                            p2wins={this.state.player2.won} />
                <StatsBar   player1={this.state.player1}
                            player2={this.state.player2}
                            gamesPlayed={this.state.gamesPlayed} />
                <MessageBlock messageText={ this.state.gameMessage } />
                <GameBoard  board={this.state.board} 
                            fillCell={this.fillCell} />
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