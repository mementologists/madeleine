import React from 'react';
import PropTypes from 'prop-types';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import VideoIcon from 'material-ui/svg-icons/av/videocam';
import ImageIcon from 'material-ui/svg-icons/image/photo-camera';
import TextIcon from 'material-ui/svg-icons/content/create';
/* eslint-disable */

const PreviewFooter = (props) => (
  <Paper zDepth={1} className="footer" >
    <BottomNavigation selectedIndex={props.index} className="footer">
      <BottomNavigationItem
        label="Video"
        icon={<VideoIcon />}
        onTouchTap={() => props.addFile('video')}
      />
      <BottomNavigationItem
        label="Camera"
        icon={<ImageIcon />}
        onTouchTap={() => {
          props.addFile('image');
        }}
      />
      <BottomNavigationItem
        label="Text"
        icon={<TextIcon />}
        onTouchTap={() => 'text'}
      />
    </BottomNavigation>
  </Paper>
);

PreviewFooter.PropTypes = {
  index: PropTypes.number,
  addFile: PropTypes.func
};

export default PreviewFooter;
