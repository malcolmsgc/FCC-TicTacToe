import React from 'react';
import BaseButton from '../components/BaseButton/BaseButton.js';
import MessageBlock from '../components/MessageBlock/MessageBlock.js';

class NumPlayers extends React.Component {
    
    render() {
        return (
            <div>
                <MessageBlock messageText="How many players?"/>
                <BaseButton buttonType="button" buttonText="1 Player"/>
                <BaseButton buttonType="button" buttonText="2 Players"/>
            </div>
        )
    }

}
       

export default NumPlayers;