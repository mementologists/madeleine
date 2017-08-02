import React from 'react';
import PropTypes from 'prop-types';
 /* eslint-disable */

const ImagePreview = ({ source }) => (
  <div style={{height:240,width:320}}>
    <img src={source} height="240" width="320" />
  </div>
);

ImagePreview.PropTypes = {
  source: PropTypes.string
};

export default ImagePreview;