import React from 'react';
import './messageblock.css';

class MessageBlock extends React.Component {
    
    render() {
        return (
            <p>{this.props.messageText}</p>
        )
    }

}

export default MessageBlock;