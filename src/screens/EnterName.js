import React from 'react';
import BaseButton from '../components/BaseButton/BaseButton.js';
import MessageBlock from '../components/MessageBlock/MessageBlock.js';

class EnterName extends React.Component {
    
    render() {
        return (
            <div>
                <MessageBlock messageText="Player 1, enter your name!" />
                <BaseButton buttonType="button" buttonText="1 Player" /> 
                <BaseButton buttonType="button" buttonText="2 Players" /> 
            </div>
        )
    }

}
       

export default EnterName;