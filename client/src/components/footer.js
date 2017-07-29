import React from 'react';
import { Link } from 'react-router-dom';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import VideoIcon from 'material-ui/svg-icons/av/videocam';
import ImageIcon from 'material-ui/svg-icons/image/photo-camera';
import TextIcon from 'material-ui/svg-icons/content/create';

const Footer = () => (
  <Paper className="footer" >
    <BottomNavigation className="footer">
      <Link to={{
        pathname: '/preview',
        state: { from: 'video' }
      }}
      >
        <BottomNavigationItem
          label="Video"
          icon={<VideoIcon />}
        />
      </Link>
      <Link to={{
        pathname: '/preview',
        state: { from: 'image' }
      }}
      >
        <BottomNavigationItem
          label="Camera"
          icon={<ImageIcon />}
        />
      </Link>
      <Link to={{
        pathname: '/preview',
        state: { from: 'text', text: true }
      }}
      >
        <BottomNavigationItem
          label="Text"
          icon={<TextIcon />}
        />
      </Link>
    </BottomNavigation>
  </Paper>
);

export default Footer;
