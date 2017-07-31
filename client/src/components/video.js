import React from 'react';
import LazyLoad from 'react-lazy-load';
import PropTypes from 'prop-types';
 /* eslint-disable */

const VideoPreview = ({ source }) => (
  <LazyLoad offset={300}>
    <video width="320" height="240" controls>
      <source src={source} type="video/mp4" />
    </video>
  </LazyLoad>
);

VideoPreview.PropTypes = {
  source: PropTypes.string
};

export default VideoPreview;
