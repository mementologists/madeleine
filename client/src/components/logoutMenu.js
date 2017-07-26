import React from 'react';
import Popover from 'material-ui/Popover/Popover';
import { Menu, MenuItem } from 'material-ui/Menu';
import FontIcon from 'material-ui/FontIcon';

export default class LogoutMenu extends React.Component {

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

  handleRequestClose() {
    this.setState({
      open: false,
    });
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

  handleTouchTap(event) {
    event.preventDefault();
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  }

  render() {
    return (
      <div className="menu">
        <FontIcon
          className="material-icons"
          onTouchTap={this.handleTouchTap}
          label="Click me"
        >menu</FontIcon>
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={this.state.anchorOrigin}
          targetOrigin={this.state.targetOrigin}
          onRequestClose={this.handleRequestClose}
        >
          <Menu>
            <MenuItem><a href="/logout">Sign Out</a></MenuItem>
          </Menu>
        </Popover>
      </div>
    );
  }
}
