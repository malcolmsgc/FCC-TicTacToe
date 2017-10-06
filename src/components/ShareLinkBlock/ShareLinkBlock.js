import React from 'react';
import PropTypes from 'prop-types';
import './sharelinkblock.css';

class ShareLinkBlock extends React.Component {

componentDidMount() {
    if (this.props.showBlock) this.p2Link.classList.remove('hidden');
}

render() {
    const player2Link = `${this.props.match.url}/${this.props.gamekey}`;
    return (
        <div className="msgblock-P2link hidden" ref={ (node) => {this.p2Link = node}}>
            <div className="wrapper">
                <p>If player 2 is using another device, send them this link:</p>
                <div id="copy-P2-link">
                    <p id="P2-link">{player2Link}</p>
                    <p id="copy-icon" onClick={ () => { alert( `${player2Link}` ) } }>Copy link</p>
                </div>
            </div>
        </div>
    );
}

}

ShareLinkBlock.PropTypes = {
    match: PropTypes.object.isRequired,
    showBlock: PropTypes.bool.isRequired,
    gamekey: PropTypes.string.isRequired,
  }


export default ShareLinkBlock;