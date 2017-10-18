import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Grid from './Grid';
import Hud from './Hud';
import Hitbox from './Hitbox';
import AudioBlock from './AudioBlock';
import TitleScreen from './TitleScreen';
import '../styles/App.css';

const App = observer(class App extends Component {
  render() {
      return (this.props.store.gameStart) ?
        (
          <div className="HudAndGrid">
            <Hitbox store={ this.props.store } />
            <Grid store={ this.props.store } />
            <Hud store={ this.props.store } />
            <AudioBlock store={ this.props.store } />
          </div>
      )
      :
      (<TitleScreen store={this.props.store} />);
  }
});

export default App;
