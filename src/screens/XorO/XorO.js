import React from 'react';
import PropTypes from 'prop-types';
import MessageBlock from '../../components/MessageBlock/MessageBlock.js';
import BaseButton from '../../components/BaseButton/BaseButton.js';
import SelectWeaponForm from '../../components/SelectWeaponForm/SelectWeaponForm.js';
import './XorO.css';

class XorO extends React.Component {

    render() {
        return (
            <div>
                <MessageBlock messageText={`Hi ${this.props.player1name}, Choose your weapon!`} />
                <SelectWeaponForm   p1useX={this.props.p1useX} 
                                    twoPlayer={this.props.twoPlayer} 
                                    selectXO={this.props.selectXO} 
                                    history={this.props.history} 
                                    match={this.props.match}
                                    gamekey={this.props.gamekey}/>
                <BaseButton buttonType="button" buttonText="Go Back" btnAction={ () => { this.props.history.goBack() } }/>
            </div>
        )
    }

}

XorO.PropTypes = {
    player1name: PropTypes.string.isRequired,
    twoPlayer: PropTypes.bool.isRequired,
    selectXO: PropTypes.func.isRequired,
  }

  export default XorO;