import React from 'react';
import BaseButton from '../components/BaseButton/BaseButton.js';
import MessageBlock from '../components/MessageBlock/MessageBlock.js';

class NumPlayers extends React.Component {
    
    render() {
        return (
            <MessageBlock messageText="How many players?"/>
            <BaseButton buttonType="button" messageText="1 Player"/>
            <BaseButton buttonType="button" messageText="2 Players"/>
        )
    }

}
       

export default NumPlayers;