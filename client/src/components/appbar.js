import React from 'react';
import AppBar from 'material-ui/AppBar';
import DataMenu from './dataViewMenu';
import HamburgerMenu from './hamburgerMenu'; // eslint-disable-line

export default props => (
  <AppBar
    className="appbar"
    iconElementLeft={<HamburgerMenu {...props} />}
    iconElementRight={<DataMenu {...props} />}
  />
);
