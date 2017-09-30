import React, { Component } from 'react';
import { observer } from 'mobx-react';

const Hud = observer(class Hud extends Component {
  render() {
    const { health, atk, exp, currentWeapon} = this.props.store.hero;
    return(
      <div className="Hud">
        <h1>{"Health: " + health}</h1>
        <h1>{"Weapon: " + currentWeapon}</h1>
        <h1>{"AtkPwr: " + atk}</h1>
        <h1>{"Level: " + this.props.store.playerLevel}</h1>
        <p>{"Exp till next level"}</p>
      </div>
    );
  }
});

export default Hud;
