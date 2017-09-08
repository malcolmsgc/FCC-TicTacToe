import React from 'react';
import './sharelinkblock.css';

class ShareLinkBlock extends React.Component {

render() {
    return (
        <div className="msgblock-P2link">
            <div className="wrapper">
                <p>If player 2 is using another device, send them this link:</p>
                <div id="copy-P2-link" onClick={alert('clicked')}>
                    <p id="P2-link">{this.props.player2Link}</p>
                    <p id="copy-icon">Copy link</p>
                </div>
            </div>
        </div>
    );
}

}

export default ShareLinkBlock;