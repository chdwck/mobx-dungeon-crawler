import React, { Component } from 'react';
import { observer } from 'mobx-react';

const Footer = observer(class Footer extends Component {
  render() {
    return(
      <div className="Footer">
        This is the Footer.
      </div>
    );
  }
});

export default Footer;
