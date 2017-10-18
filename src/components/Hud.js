import React, { Component } from 'react';
import { observer } from 'mobx-react';

const Hud = observer(class Hud extends Component {
  componentDidMount() {
    if (this.props.store.gameLevel !== 5) this.handleClick();
  }

  handleClick() {
    const s = document.getElementById('Song');
    let { playingMusic } = this.props.store;
    this.props.store.playingMusic = !this.props.store.playingMusic;
    playingMusic ? s.pause() : s.play();
  }

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
        <button onClick={() => this.handleClick()}>
          {this.props.store.playingMusic ? 'Pause Music' : 'Play Music'}
        </button>
      </div>
    );
  }
});

export default Hud;
