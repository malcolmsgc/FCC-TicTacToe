import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import BaseButton from '../BaseButton/BaseButton.js';
import './enternameform.css';

class EnterNameForm extends React.Component {

    getName(e) {
        let next = "/";
        e.preventDefault(); 
        // add player name to state
        // takes player number and player name as args
        this.props.addName({playerNum: this.props.playerNum, playerName: this.playerNameInput.value});
        console.log(`User entered ${this.playerNameInput.value}`);
        // navigate to next step
        //      if player 1
        if (this.props.playerNum === '1') {
            next = "/xo";
        }
        //      if player 2 
        else {
            next = `/gameon/${this.props.gamekey}`;
        }
        this.props.history.push(next);
    }
    


    render() {
        return (
            <form className="enter-name" onSubmit={(e) => {this.getName(e)} } >
                <input type="text"  className="player-name" 
                                    placeholder={`Player ${this.props.playerNum}'s name`} 
                                    defaultValue={`Player ${this.props.playerNum}`}
                                    ref={(input) => {this.playerNameInput = input;}} />
                <BaseButton buttonType="submit" className={`p${this.props.playerNum}`} buttonText="Continue"/>
            </form>
        )
    }

}

EnterNameForm.PropTypes = {
    playerNum: PropTypes.string.isRequired,
    addName: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    gamekey: PropTypes.string.isRequired,
  }

export default EnterNameForm;