import React from 'react';
import PropTypes from 'prop-types';
import BaseButton from '../BaseButton/BaseButton.js';
import './selectweaponform.css';

class SelectWeaponForm extends React.Component {

    constructor(){
        super();
        //the following are both called within lexical scope of class so bind not 100% nec. Added for more resilience.
        this.handleSelected = this.handleSelected.bind(this);
        this.routeOnSubmit = this.routeOnSubmit.bind(this);
    }

handleSelected(changeEvent) {
    //pass value through to function as boolean
    this.props.selectXO(changeEvent.target.value === 'true');
}

routeOnSubmit(event) {
    event.preventDefault();
    if (this.props.p1useX !== true && this.props.p1useX !== false) return;
    this.props.history.push("/name/2");
}

render() {
    return (
        <form className="x-or-o" onSubmit={ (e) => { this.routeOnSubmit(e) }}>
            <div className="xo-inputs">
                <label> {/*for="useX"*/}
                    <input type="radio" id="useX" name="useX" value="true" checked={this.props.p1useX===true} onChange={this.handleSelected}/>
                <span>X</span>
                </label>
                <label> {/*for="useO"*/}
                    <input type="radio" id="useO" name="useX" value="false" checked={this.props.p1useX===false} onChange={this.handleSelected}/>
                    <span>O</span>
                </label>
            </div>
            <BaseButton buttonType="submit" className="p1" buttonText="Continue"/>
        </form>
    )
}

}

SelectWeaponForm.PropTypes = {
    p1useX: PropTypes.bool,
    history: PropTypes.object.isRequired,
  }

  export default SelectWeaponForm;
