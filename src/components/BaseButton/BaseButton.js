import React from 'react';
import './basebutton.css';

class BaseButton extends React.Component {
    
    render() {
        if (this.props.buttonType.toLowerCase() === 'button') {
            return (
                <button type={this.props.buttonType} onClick={this.props.btnAction} >{this.props.buttonText}</button>
            )
        }
        else {
            return (
                <button type={this.props.buttonType}>{this.props.buttonText}</button>
            )
        }
    }

}

export default BaseButton;