import React from 'react';
import BaseButton from '../BaseButton/BaseButton.js';
import './enternameform.css';

class EnterNameForm extends React.Component {

    getName(e) {
        e.preventDefault(); 
        console.log(this.playerNameInput.value);
    }
    
    render() {
        return (
            <form className="enter-name" onSubmit={(e) => {this.getName(e)} } >
                <input type="textarea"  className="player-name" 
                                    placeholder={`Player ${this.props.playerNum}'s name`} 
                                    defaultValue={`Player ${this.props.playerNum}`}
                                    ref={(input) => {this.playerNameInput = input;}} />
                <BaseButton buttonType="submit" buttonText="Continue"/>
            </form>
        )
    }

}
       

export default EnterNameForm;