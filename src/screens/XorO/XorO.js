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
                <SelectWeaponForm p1useX={this.props.p1useX} selectXO={this.props.selectXO}/>
                <BaseButton buttonType="button" buttonText="Go Back" btnAction={ () => { this.props.history.goBack() } }/>
            </div>
        )
    }

}

XorO.PropTypes = {
    player1name: PropTypes.bool.isRequired,
    selectXO: PropTypes.func.isRequired,
  }

  export default XorO;