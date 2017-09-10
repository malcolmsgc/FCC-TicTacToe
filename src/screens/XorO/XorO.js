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
                <MessageBlock messageText={`Hi ${this.props.playername}, Choose your weapon!`} />
                <SelectWeaponForm p1useX={this.props.p1useX}/>
                <BaseButton buttonType="button" buttonText="Go Back" btnAction={ () => {alert('back') } }/>
            </div>
        )
    }

}

XorO.PropTypes = {
    playername: PropTypes.bool.isRequired
  }

  export default XorO;