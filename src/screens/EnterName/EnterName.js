import React from 'react';
import MessageBlock from '../../components/MessageBlock/MessageBlock.js';
import ShareLinkBlock from '../../components/ShareLinkBlock/ShareLinkBlock.js';
import EnterNameForm from '../../components/EnterNameForm/EnterNameForm.js';
import './entername.css';

class EnterName extends React.Component {

    
    
    render() {
        return (
            <div className="EnterName">
                <ShareLinkBlock player2Link="http://www.cnjcbeiucdcvde.cdnscibu.cndochudoaheo#jcido" showBlock={true} />
                <MessageBlock messageText={`Player ${this.props.playerNum}, enter your name!`} />
                <EnterNameForm playerNum={this.props.playerNum} />
            </div>
        )
    }

}
       

export default EnterName;