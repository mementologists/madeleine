import React from 'react';
import { CardMedia } from 'material-ui/Card';
import PropTypes from 'prop-types';

const ImageEntry = ({ moment }) => (
  <CardMedia>
    <img src={moment.uri} alt="" />
  </CardMedia>
  );

ImageEntry.propTypes = {
  moment: PropTypes.shape({
    uri: PropTypes.string,
  })
};

export default ImageEntry;
