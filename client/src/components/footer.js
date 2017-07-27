import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
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
    this.render = () => (
      <Redirect to={{
        pathname: '/preview',
        state: { from: index }
      }}
      />
    );
    this.setState({
      selectedIndex: 'go go'
    });
  }

  render() {
    return (
      <Paper zDepth={1} className="footer" >
        <BottomNavigation className="footer">
          <BottomNavigationItem
            label="Video"
            icon={videoIcon}
            onTouchTap={() => this.select('video')}
          />
          <BottomNavigationItem
            label="Camera"
            icon={cameraIcon}
            onTouchTap={() => this.select('image')}
          />
          <BottomNavigationItem
            label="Text"
            icon={textIcon}
            onTouchTap={() => this.select('text')}
          />
        </BottomNavigation>
      </Paper>
    );
  }
}

export default Footer;
