import React from 'react';
import BaseButton from '../components/BaseButton/BaseButton.js';
import MessageBlock from '../components/MessageBlock/MessageBlock.js';

class EnterName extends React.Component {

    getName(e) {
        e.preventDefault(); 
        console.log(this.playerNameInput.value);
    }
    
    render() {
        return (
            <form className="enter-name" onSubmit={(e) => {this.getName(e)} } >
                <input type="text"  className="player-name" 
                                    placeholder={`Player ${this.props.playerNum}`} 
                                    defaultValue={`Player ${this.props.playerNum}`}
                                    ref={(input) => {this.playerNameInput = input;}} />
                <BaseButton buttonType="submit" buttonText="Continue"/>
            </form>
        )
    }

}
       

export default EnterName;