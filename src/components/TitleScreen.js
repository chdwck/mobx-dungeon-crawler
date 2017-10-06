import React, { Component } from 'react';
import { observer } from 'mobx-react';
import AudioBlock from './AudioBlock';

const TitleScreen = observer(class TitleScreen extends Component {

  componentDidMount() {
    this.props.store.playSound('Opener');
  }

  handleClick() {
    this.props.store.playSound('Confirm');
    setTimeout(() => this.props.store.gameStart = true, 1000);
  }

  render() {
    return(
      <div className="TitleScreen">
          <AudioBlock />
          <h1 className="Title">Mobx-React Dungeon Crawler</h1>
        <h1 className="PlayButton" onClick={() => this.handleClick() }>
          * Play *
        </h1>
      </div>
    );
  }
});

export default TitleScreen;
