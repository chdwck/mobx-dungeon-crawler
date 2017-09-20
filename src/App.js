import React, { Component } from 'react';
import { observer } from 'mobx-react';
import './styles/World.css';
import TheHero from './components/TheHero';

const App = observer(class App extends Component {
  render() {
    return (
      <div className="World">
        <TheHero store={this.props.store}/>
      </div>
    );
  }
})

export default App;
