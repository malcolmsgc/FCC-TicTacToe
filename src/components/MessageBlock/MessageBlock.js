import React from 'react';
import PropTypes from 'prop-types';
import './messageblock.css';

class MessageBlock extends React.Component {
    
    render() {
        return (
            <p>{this.props.messageText}</p>
        )
    }

}

MessageBlock.PropTypes = {
    messageText: PropTypes.string.isRequired
}

export default MessageBlock;