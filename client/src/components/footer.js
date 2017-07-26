import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';

const videoIcon = <FontIcon className="material-icons">videocam</FontIcon>;
const cameraIcon = <FontIcon className="material-icons">photo_camera</FontIcon>;
const textIcon = <FontIcon className="material-icons">create</FontIcon>;

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
    };
  }

  select(index) {
    this.setState({
      selectedIndex: index
    });
  }

  render() {
    return (
      <Paper zDepth={1} className="footer" >
        <BottomNavigation selectedIndex={this.state.selectedIndex} className="footer">
          <BottomNavigationItem
            label="Video"
            icon={videoIcon}
            onTouchTap={() => this.select(0)}
          />
          <BottomNavigationItem
            label="Camera"
            icon={cameraIcon}
            onTouchTap={() => this.select(1)}
          />
          <BottomNavigationItem
            label="Text"
            icon={textIcon}
            onTouchTap={() => this.select(2)}
          />
        </BottomNavigation>
      </Paper>
    );
  }
}

export default Footer;
