import React from 'react';
import PropTypes from 'prop-types';
import FontIcon from 'material-ui/FontIcon';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
/* eslint-disable */

const PreviewFooter = (props) => {
  const videoIcon = <FontIcon className="material-icons">videocam</FontIcon>;
  const cameraIcon = <FontIcon className="material-icons">photo_camera</FontIcon>;
  const textIcon = <FontIcon className="material-icons">create</FontIcon>;
  return (
    <Paper zDepth={1} className="footer" >
      <BottomNavigation selectedIndex={props.index} className="footer">
        <BottomNavigationItem
          label="Video"
          icon={videoIcon}
          onTouchTap={() => props.addFile('video')}
        />
        <BottomNavigationItem
          label="Camera"
          icon={cameraIcon}
          onTouchTap={() => {
            props.addFile('image');
          }}
        />
        <BottomNavigationItem
          label="Text"
          icon={textIcon}
          onTouchTap={() => 'text'}
        />
      </BottomNavigation>
    </Paper>
  );
};

PreviewFooter.PropTypes = {
  index: PropTypes.number,
  addFile: PropTypes.func
};

export default PreviewFooter;
