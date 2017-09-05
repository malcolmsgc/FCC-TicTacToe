import React from 'react';
import BaseButton from '../components/BaseButton/BaseButton.js';
import MessageBlock from '../components/MessageBlock/MessageBlock.js';

class EnterName extends React.Component {

    constructor() {
        super();
        this.getName = this.getName.bind(this);
    }

    getName(e) {
        e.preventDefault(); 
        alert({this.refs.playerNameInput.value});
    }
    
    render() {
        return (
            <form className="enter-name" onSubmit={(e) => {this.getName(e)} } >
                <input type="text"  className="player-name" 
                                    placeholder={'player'+1} 
                                    defaultValue="Player 1"
                                    ref={(input) => {this.playerNameInput = input;}} />
                <BaseButton buttonType="submit" messageText="Continue"/>
            </form>
        )
    }

}
       

export default EnterName;