import React from 'react';
import PropTypes from 'prop-types';
import MessageBlock from '../../components/MessageBlock/MessageBlock.js';
import ShareLinkBlock from '../../components/ShareLinkBlock/ShareLinkBlock.js';
import EnterNameForm from '../../components/EnterNameForm/EnterNameForm.js';
import './entername.css';

class EnterName extends React.Component {

    render() {
        const player = this.props.match.params.player;
        const showBlock = player === '1' ? false : true;
        return (
            <div className="EnterName">
                <ShareLinkBlock player2Link="http://www.cnjcbeiucdcvde.cdnscibu.cndochudoaheo#jcido" showBlock={showBlock} />
                <MessageBlock messageText={`Player ${player}, enter your name!`} />
                <EnterNameForm  playerNum={player}
                                history={this.props.history}
                                addName={this.props.addName}
                                />
            </div>
        )
    }

}
       
EnterName.PropTypes = {
    history: PropTypes.object.isRequired,
    addName: PropTypes.func.isRequired,
  }

export default EnterName;