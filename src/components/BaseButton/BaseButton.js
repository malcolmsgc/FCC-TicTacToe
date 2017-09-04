import React from 'react';
import './basebutton.css';

class BaseButton extends React.Component {
    
    render() {
        return (
            <button type={this.props.buttonType}>{this.props.buttonText}</button>
        )
    }

}

export default BaseButton;