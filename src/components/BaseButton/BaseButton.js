import React from 'react';
import PropTypes from 'prop-types';
import './basebutton.css';

class BaseButton extends React.Component {
    
    render() {
        if (this.props.buttonType.toLowerCase() === 'button') {
            return (
                <button type={this.props.buttonType} onClick={this.props.btnAction} className={this.props.className}>{this.props.buttonText}</button>
            )
        }
        else {
            return (
                <button type={this.props.buttonType} className={this.props.className}>{this.props.buttonText}</button>
            )
        }
    }

}

BaseButton.PropTypes = {
    buttonType: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired,
    btnAction: PropTypes.func,
  }

export default BaseButton;