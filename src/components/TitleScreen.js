import React, { Component } from 'react';
import { observer } from 'mobx-react';

const TitleScreen = observer(class TitleScreen extends Component {

  render() {
    return(
      <div className="TitleScreen">
          <h1 className="Title">Mobx-React Dungeon Crawler</h1>
        <h1 onClick={() => this.props.store.gameStart=true}>
          * Play *
        </h1>
      </div>
    );
  }
});

export default TitleScreen;
