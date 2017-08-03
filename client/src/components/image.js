import React from 'react';
import PropTypes from 'prop-types';
import { CardMedia } from 'material-ui/Card';
 /* eslint-disable */

const ImagePreview = ({ source }) => (
  <CardMedia>
    <img src={source} />
  </CardMedia>
);

ImagePreview.PropTypes = {
  source: PropTypes.string
};

export default ImagePreview;