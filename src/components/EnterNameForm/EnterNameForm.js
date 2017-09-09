import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import BaseButton from '../BaseButton/BaseButton.js';
import './enternameform.css';

class EnterNameForm extends React.Component {

    getName(e) {
        let next = "/where-we-going?hi";
        e.preventDefault(); 
        // add player name to state
        console.log(`User entered ${this.playerNameInput.value}`);
        // navigate to next step
        //  if single player
        //  if two player
        //      if player 1
        //      if player 2 
        this.props.history.push(next);
    }
    
    render() {
        return (
            <form className="enter-name" onSubmit={(e) => {this.getName(e)} } >
                <input type="text"  className="player-name" 
                                    placeholder={`Player ${this.props.playerNum}'s name`} 
                                    defaultValue={`Player ${this.props.playerNum}`}
                                    ref={(input) => {this.playerNameInput = input;}} />
                <BaseButton buttonType="submit" buttonText="Continue"/>
            </form>
        )
    }

}

EnterNameForm.PropTypes = {
    playerNum: PropTypes.string.isRequired
  }

export default EnterNameForm;