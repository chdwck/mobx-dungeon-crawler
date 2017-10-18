import React, { Component } from 'react';
import { observer } from 'mobx-react';


const Hitbox = observer(class Hitbox extends Component {
  render(){
    return(
      <div>
        <div className="Hitbox1">
         <h1 id="chosenKey" >{this.props.store.chosenKey}</h1>
         <h1 style={{display: 'none'}} id="percent" >{this.props.store.percentWinStr}</h1>
        </div>
        <div className="Hitbox2"></div>
      </div>
    );
  }
})

export default Hitbox;
