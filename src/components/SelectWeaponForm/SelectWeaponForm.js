import React from 'react';
import PropTypes from 'prop-types';
import BaseButton from '../BaseButton/BaseButton.js';
import './selectweaponform.css';

class SelectWeaponForm extends React.Component {

    constructor(){
        super();
        this.handleSelected = this.handleSelected.bind(this);
    }

handleSelected(changeEvent) {
    //pass value through to function as boolean
    this.props.selectXO(changeEvent.target.value === 'true');
}

render() {
    return (
        <form className="x-or-o">
            <div className="xo-inputs">
                <label for="useX">
                    <input type="radio" id="useX" name="useX" value="true" checked={this.props.p1useX===true} onChange={this.handleSelected}/>
                <span>X</span>
                </label>
                <label for="useO">
                    <input type="radio" id="useO" name="useX" value="false" checked={this.props.p1useX===false} onChange={this.handleSelected}/>
                    <span>O</span>
                </label>
            </div>
            <BaseButton buttonType="submit" buttonText="Continue"/>
        </form>
    )
}

}

SelectWeaponForm.PropTypes = {
    p1useX: PropTypes.bool,
  }

  export default SelectWeaponForm;
