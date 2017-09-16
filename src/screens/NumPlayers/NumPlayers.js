import React from 'react';
import PropTypes from 'prop-types';
import BaseButton from '../../components/BaseButton/BaseButton.js';
import MessageBlock from '../../components/MessageBlock/MessageBlock.js';
import { Link } from 'react-router-dom';
//import './numplayers.css';

class NumPlayers extends React.Component {

    singlePlayer() {

    }

    twoPlayer() {

    }
    
    render() {
        return (
    
                <div>
                    <MessageBlock messageText="How many players?"/>
                    <Link to='/name/1'>
                        <BaseButton buttonType="button" buttonText="1 Player" btnAction={() => {this.props.isTwoPlayer(false)} }/>
                    </Link>
                    <Link to='/name/1'>
                        <BaseButton buttonType="button" buttonText="2 Players" btnAction={() => {this.props.isTwoPlayer(true)} }/>
                    </Link>
                </div>
            
        )
    }

}

NumPlayers.PropTypes = {
    isTwoPlayer: PropTypes.func.isRequired,
}

export default NumPlayers;