import React, { Component } from 'react';
import { observer } from 'mobx-react';

const Footer = observer(class Footer extends Component {
  render() {
    return(
      <div className="Footer">
        <h1>Mobx-React Dungeon Crawler</h1>
        <p>Peep the code on <a target="_blank" href="https://github.com/Mrchadparkour/mobx-dungeon-crawler">Github</a></p>
      </div>
    );
  }
});

export default Footer;
