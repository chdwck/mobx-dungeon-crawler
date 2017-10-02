import React, { Component } from 'react';
import { observer } from 'mobx-react';

const Hud = observer(class Hud extends Component {
  render() {
    const { health, atk, currentWeapon} = this.props.store.hero;
    const { playerLevel, expTillNext } = this.props.store;

    return(
      <div className="Hud">
        <h1>{"Health: " + health}</h1>
        <h1>{"Weapon: " + currentWeapon}</h1>
        <h1>{"AtkPwr: " + atk}</h1>
        <h1>{"Level: " + playerLevel}</h1>
        <p>{"Exp till next level: " + expTillNext}</p>
      </div>
    );
  }
});

export default Hud;
