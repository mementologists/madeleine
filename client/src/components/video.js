import React from 'react';
import LazyLoad from 'react-lazy-load';
import { CardMedia } from 'material-ui/Card';
import PropTypes from 'prop-types';
 /* eslint-disable */

const VideoPreview = ({ source }) => (
  <LazyLoad offset={300}>
    <CardMedia>
      <video controls>
        <source src={source} type="video/mp4" />
      </video>
    </CardMedia>
  </LazyLoad>
);

VideoPreview.PropTypes = {
  source: PropTypes.string
};

export default VideoPreview;
