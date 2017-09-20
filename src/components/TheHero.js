import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { movement } from '../GameEngine';
import '../styles/TheHero.css';

const TheHero = observer(class TheHero extends Component {
  componentDidMount() {
    movement();
  }
  
  render() {
    console.log(this.props.store);
    return(
      <div className="TheHero"></div>
    );
  }
})
export default TheHero;
