import React from 'react';
import './sharelinkblock.css';

class ShareLinkBlock extends React.Component {

componentDidMount() {
    if (this.props.showBlock) this.p2Link.classList.remove('hidden');
}

render() {
    return (
        <div className="msgblock-P2link hidden" ref={ (node) => {this.p2Link = node}}>
            <div className="wrapper">
                <p>If player 2 is using another device, send them this link:</p>
                <div id="copy-P2-link">
                    <p id="P2-link">{this.props.player2Link}</p>
                    <p id="copy-icon" onClick={ () => { alert( `${this.props.player2Link}` ) } }>Copy link</p>
                </div>
            </div>
        </div>
    );
}

}

export default ShareLinkBlock;