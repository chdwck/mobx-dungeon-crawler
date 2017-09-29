import React, { Component } from 'react';
import { observer } from 'mobx-react';

const Hud = observer(class Hud extends Component {
  render() {
    return(
      <div className="Hud">
        This is the Hud.
      </div>
    );
  }
});

export default Hud;
