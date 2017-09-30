import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Grid from './components/Grid';
import Hud from './components/Hud';
import Footer from './components/Footer';
import './styles/App.css';

const App = observer(class App extends Component {
  render() {
    return(
      <div>
        <div className="HudAndGrid">
          <Hud store={ this.props.store } />
          <Grid store={ this.props.store } />
        </div>
        <Footer />
      </div>
    );
  }
});

export default App;
