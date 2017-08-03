import React from 'react';
import PropTypes from 'prop-types';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import VideoIcon from 'material-ui/svg-icons/av/videocam';
import ImageIcon from 'material-ui/svg-icons/image/photo-camera';
import TextIcon from 'material-ui/svg-icons/content/create';
import { white } from 'material-ui/styles/colors';
/* eslint-disable */
const iconStyles = {
  height: '35px'
};

const PreviewFooter = ({ index, addFile, isDisabled }) => (
  <Paper zDepth={1} className="footer" >
    <BottomNavigation selectedIndex={index} className="footer">
      <BottomNavigationItem
        disabled={isDisabled.video}
        icon={<VideoIcon style={iconStyles} color={white} />}
        onTouchTap={() => addFile('video')}
      />
      <BottomNavigationItem
        icon={<ImageIcon style={iconStyles} color={white} />}
        disabled={isDisabled.image}
        onTouchTap={() => addFile('image')}
      />
      <BottomNavigationItem
        icon={<TextIcon style={iconStyles} color={white} />}
      />
    </BottomNavigation>
  </Paper>
);

PreviewFooter.PropTypes = {
  index: PropTypes.number,
  addFile: PropTypes.func
};

export default PreviewFooter;