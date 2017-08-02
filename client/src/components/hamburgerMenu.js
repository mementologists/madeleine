import React from 'react';
import Popover from 'material-ui/Popover/Popover';
import { Menu, MenuItem } from 'material-ui/Menu';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';

/* eslint-disable react/prop-types */
export default class HamburgerMenu extends React.Component {
  static muiName = 'IconButton';

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      anchorOrigin: {
        horizontal: 'left',
        vertical: 'bottom',
      },
      targetOrigin: {
        horizontal: 'left',
        vertical: 'top',
      },
    };
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.setAnchor = this.setAnchor.bind(this);
    this.setTarget = this.setTarget.bind(this);
  }

  setAnchor(positionElement, position) {
    const { anchorOrigin } = this.state;
    anchorOrigin[positionElement] = position;

    this.setState({ anchorOrigin });
  }

  setTarget(positionElement, position) {
    const { targetOrigin } = this.state;
    targetOrigin[positionElement] = position;

    this.setState({ targetOrigin });
  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
  }

  handleTouchTap(event) {
    event.preventDefault();
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  }

  render() {
    return (
      <div>
        <IconButton
          onTouchTap={this.handleTouchTap}
          {...this.props}
        >
          <MenuIcon />
        </IconButton>
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={this.state.anchorOrigin}
          targetOrigin={this.state.targetOrigin}
          onRequestClose={this.handleRequestClose}
        >
          <Menu>
            { this.props.userId ?
              <a href="/logout"><MenuItem primaryText="Sign Out" /></a> :
              <a href="/login"><MenuItem primaryText="Login/Sign Up" /></a> }
          </Menu>
        </Popover>
      </div>
    );
  }
}

