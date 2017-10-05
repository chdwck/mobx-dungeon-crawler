import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Grid from './components/Grid';
import Hud from './components/Hud';
import AudioBlock from './components/AudioBlock';
import Footer from './components/Footer';
import TitleScreen from './components/TitleScreen';
import './styles/App.css';

const App = observer(class App extends Component {
  render() {
      return (this.props.store.gameStart) ?
        (
          <div className="HudAndGrid">
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
