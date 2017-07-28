import React from 'react';
import PropTypes from 'prop-types';
// import Image from './image.js';
import VideoPreview from './video';
import ImagePreview from './image';

const MediaPreview = ({ tag, source }) => { // eslint-disable-line
  const tagHash = {
    video: <VideoPreview source={source} />,
    image: <ImagePreview source={source} />
  };
  return (
    <div>
      {tagHash[tag]}
    </div>
  );
};

MediaPreview.PropTypes = {
  tag: PropTypes.string,
  source: PropTypes.string
};

export default MediaPreview;
