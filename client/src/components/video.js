import React from 'react';
import PropTypes from 'prop-types';
 /* eslint-disable */

const VideoPreview = ({ source }) => (
  <video width="320" height="240" controls>
    <source src={source} type="video/mp4" />
  </video>
);

VideoPreview.PropTypes = {
  source: PropTypes.string
};

export default VideoPreview;
