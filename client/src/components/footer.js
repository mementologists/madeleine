import React from 'react';
import { Link } from 'react-router-dom';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import VideoIcon from 'material-ui/svg-icons/av/videocam';
import ImageIcon from 'material-ui/svg-icons/image/photo-camera';
import TextIcon from 'material-ui/svg-icons/content/create';
import { white } from 'material-ui/styles/colors';

const iconStyles = {
  height: '35px'
};

const Footer = () => (
  <Paper zDepth={1} className="footer" >
    <BottomNavigation className="footer">
      <Link to={{
        pathname: '/preview',
        state: { from: 'video' }
      }}
      >
        <BottomNavigationItem
          icon={<VideoIcon style={iconStyles} color={white} />}
        />
      </Link>
      <Link to={{
        pathname: '/preview',
        state: { from: 'image' }
      }}
      >
        <BottomNavigationItem
          icon={<ImageIcon style={iconStyles} color={white} />}
          color={white}
        />
      </Link>
      <Link to={{
        pathname: '/preview',
        state: { from: 'text', text: true }
      }}
      >
        <BottomNavigationItem
          icon={<TextIcon style={iconStyles} color={white} />}
          color={white}
        />
      </Link>
    </BottomNavigation>
  </Paper>
);

export default Footer;
