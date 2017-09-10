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
                <input type="radio" name="useX" value={true} checked={this.props.p1useX===true} onChange={this.handleSelected}/>
                <input type="radio" name="useX" value={false} checked={this.props.p1useX!==true} onChange={this.handleSelected}/>
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
