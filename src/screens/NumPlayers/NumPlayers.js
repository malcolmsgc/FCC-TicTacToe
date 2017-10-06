import React from 'react';
import PropTypes from 'prop-types';
import BaseButton from '../../components/BaseButton/BaseButton.js';
import MessageBlock from '../../components/MessageBlock/MessageBlock.js';
import './numplayers.css';

class NumPlayers extends React.Component {

    constructor(){
        super();
        this.next = this.next.bind(this);
    }

    next() {
        this.props.history.push('/name/1');
    }
    
    render() {
        return (
    
                <div className="num-players">
                    <MessageBlock messageText="How many players?"/>
                        <BaseButton buttonType="button" buttonText="1 Player" className="p1" btnAction={() => {this.props.isTwoPlayer(false);this.next();} }/>
                        <BaseButton buttonType="button" buttonText="2 Players" className="p2" btnAction={() => {this.props.isTwoPlayer(true);this.next();} }/>
                </div>
            
        )
    }

}

NumPlayers.PropTypes = {
    isTwoPlayer: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
}

export default NumPlayers;